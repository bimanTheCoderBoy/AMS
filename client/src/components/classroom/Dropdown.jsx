import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import api from '../../api/axiosConfig';


const Dropdown = ({ label, apiEndpoint, selectedValue, onChange }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get(apiEndpoint);
        const formattedOptions = response.data.data.map(option => ({
          value: option._id,
          label: option.name
        }));
        setOptions(formattedOptions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [apiEndpoint]);

  const handleChange = (selectedOption) => {
    onChange(selectedOption.value);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label}
      </label>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={`Select ${label}`}
        isSearchable
        isLoading={loading}
        loadingMessage={() => "Loading..."}
        noOptionsMessage={() => "No options found"}
        styles={customSelectStyles}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Match existing modal styles
const customSelectStyles = {
  control: (base) => ({
    ...base,
    borderColor: '#e2e8f0',
    borderRadius: '0.375rem',
    minHeight: '40px',
    '&:hover': {
      borderColor: '#cbd5e1'
    }
  }),
  input: (base) => ({
    ...base,
    color: '#1e293b'
  }),
  placeholder: (base) => ({
    ...base,
    color: '#94a3b8'
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? '#f8fafc' : '#ffffff',
    color: '#1e293b',
    '&:active': {
      backgroundColor: '#f1f5f9'
    }
  })
};

export default Dropdown;
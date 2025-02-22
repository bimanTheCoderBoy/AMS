import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Loader from '../basic/Loader';

const Dropdown = ({ label, apiEndpoint, selectedValue, onChange }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get(apiEndpoint);
        setOptions(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  if (loading) return <div className='my-10 w-full flex justify-center'> <Loader loading={loading} size={20}/></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

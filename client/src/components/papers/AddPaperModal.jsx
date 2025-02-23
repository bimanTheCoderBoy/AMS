import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import api from '../../api/axiosConfig';
import Loader from '../basic/Loader';
import toast from "react-hot-toast";
const AddPaperModal = ({ classroomId, onClose, onPaperAdded }) => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  
    // Fetch all subjects on component mount
    useEffect(() => {
      const fetchSubjects = async () => {
        try {
          const response = await api.get('/admin/subjects');
          setSubjects(response.data.data.map(subject => ({
            value: subject._id,
            label: `${subject.name} (${subject.code})`,
            data: subject 
          })));
        } catch (err) {
          setError('Failed to load subjects');
        //   toast.error('Failed to load subjects');
        } finally {
          setIsLoadingSubjects(false);
        }
      };
  
      fetchSubjects();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedSubject) return;
  
      setLoading(true);
      try {
        const response = await api.post(`/admin/classes`, {
          classroom_id:classroomId,
          subject_id: selectedSubject.value
        });
       
        onPaperAdded(response.data.data.subject_id);
        onClose();
        toast.success('Paper added successfully');
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to add paper';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-xl text-black font-bold mb-4">Add New Paper</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Select Subject
              </label>
              <Select
                options={subjects}
                value={selectedSubject}
                onChange={setSelectedSubject}
                placeholder={isLoadingSubjects ? "Loading subjects..." : "Search subjects..."}
                isSearchable
                isLoading={isLoadingSubjects}
                loadingMessage={() => "Loading subjects..."}
                noOptionsMessage={() => "No subjects found"}
                styles={customSelectStyles}
              />
            </div>
  
            {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
  
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                disabled={loading || !selectedSubject}
              >
                {loading && <Loader loading={true} size={10} />}
                Add Paper
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Custom styling remains the same as before
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
  
  export default AddPaperModal;
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api/axiosConfig';
import Loader from '../basic/Loader';
import toast from 'react-hot-toast';

const CreateScheduleModal = ({ classroomId, onClose, onScheduleCreated }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, teachersRes] = await Promise.all([
          api.get('/admin/subjects'),
          api.get('/admin/teachers')
        ]);

        setSubjects(subjectsRes.data.data.map(subject => ({
          value: subject._id,
          label: `${subject.name} (${subject.code})`
        })));

        setTeachers(teachersRes.data.data.map(teacher => ({
          value: teacher._id,
          label: `${teacher.first_name} ${teacher.last_name}`
        })));

      } catch (err) {
        setError('Failed to load initial data');
        toast.error('Failed to load data');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubject || !startTime || !endTime || selectedTeachers.length === 0) return;

    setLoading(true);
    try {
      const response = await api.post(`/admin/schedules`, {
        classroom_id: classroomId,
        subject_id: selectedSubject.value,
        teachers: selectedTeachers.map(t => t.value),
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
      });

      onScheduleCreated(response.data.data);
      onClose();
      toast.success('Schedule created successfully');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create schedule';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl text-black font-bold mb-4">Create New Schedule</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Subject Select */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Subject
              </label>
              <Select
                options={subjects}
                value={selectedSubject}
                onChange={setSelectedSubject}
                placeholder="Search subjects..."
                isSearchable
                isLoading={isLoadingData}
                loadingMessage={() => "Loading subjects..."}
                noOptionsMessage={() => "No subjects found"}
                styles={customSelectStyles}
              />
            </div>

            {/* Time Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Start Time
                </label>
                <DatePicker
                  selected={startTime}
                  onChange={date => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  dateFormat="h:mm aa"
                  className="w-full p-2 border-2 text-[#1e293b] border-gray-200 rounded-md focus:ring-2 focus:ring-transparent focus:border-blue-400 transition-colors placeholder-gray-400 focus:outline-none"
                  placeholderText="Select start time"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  End Time
                </label>
                <DatePicker
                  selected={endTime}
                  onChange={date => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  dateFormat="h:mm aa"
                  className="w-full p-2 border-2 text-[#1e293b] border-gray-200 rounded-md focus:ring-2 focus:ring-transparent focus:border-blue-400 transition-colors placeholder-gray-400 focus:outline-none"
                  placeholderText="Select end time"
                />
              </div>
            </div>

            {/* Teachers MultiSelect */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Teachers
              </label>
              <Select
                isMulti
                options={teachers}
                value={selectedTeachers}
                onChange={setSelectedTeachers}
                placeholder="Select teachers..."
                isSearchable
                isLoading={isLoadingData}
                loadingMessage={() => "Loading teachers..."}
                noOptionsMessage={() => "No teachers found"}
                styles={customSelectStyles}
              />
            </div>
          </div>

          {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}

          <div className="flex justify-end gap-3 mt-6">
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
              disabled={loading || !selectedSubject || !startTime || !endTime || selectedTeachers.length === 0}
            >
              {loading && <Loader loading={true} size={10} />}
              Create Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reuse the same custom styles from AddPaperModal
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
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#f1f5f9',
    borderRadius: '0.25rem'
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#1e293b'
  })
};

export default CreateScheduleModal;
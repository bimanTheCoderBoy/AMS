import React, { useState } from 'react';
import Select from 'react-select';
import { Navigate, useNavigate } from 'react-router-dom';


const ViewClassroomModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const navigate=useNavigate()
  const [selections, setSelections] = useState({
    department: null,
    level: null,
    program: null,
    course: null,
    semester:null
  });
  const [customEntry, setCustomEntry] = useState('');
  const [numSemesters, setNumSemesters] = useState('');
  const [semesters, setSemesters] = useState([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  // Enhanced Demo Data
  const hierarchyOptions = {
    department: [
      { value: 'CSE', label: 'Computer Science' },
      { value: 'ECE', label: 'Electronics & Communication' },
      { value: 'ME', label: 'Mechanical Engineering' },
      { value: 'CE', label: 'Civil Engineering' },
      { value: 'EE', label: 'Electrical Engineering' },
      { value: 'others', label: '+ Add New Department' }
    ],
    level: [
      { value: 'UG', label: 'Undergraduate' },
      { value: 'PG', label: 'Postgraduate' },
      { value: 'DIPLOMA', label: 'Diploma' },
      { value: 'PHD', label: 'Doctoral Studies' },
      { value: 'others', label: '+ Add New Level' }
    ],
    program: [
      { value: 'AICTE', label: 'AICTE Program' },
      { value: 'NEP', label: 'NEP Program' },
      { value: 'VTU', label: 'VTU Program' },
      { value: 'DU', label: 'Delhi University Program' },
      { value: 'others', label: '+ Add New Program' }
    ],
    course: [
      { value: 'AI', label: 'Artificial Intelligence' },
      { value: 'ML', label: 'Machine Learning' },
      { value: 'DS', label: 'Data Science' },
      { value: 'CS', label: 'Cyber Security' },
      { value: 'IOT', label: 'Internet of Things' },
      { value: 'others', label: '+ Add New Course' }
    ],
    semester: [
        { value: '1', label: '1st' },
        { value: '2', label: '2nd' },
        { value: '3', label: '3rd' },
        { value: '4', label: '4th' },
        { value: '5', label: '5th' },
        { value: '6', label: '+ Add New Semester' }
      ]
  };

  const handleHierarchyChange = (type, selected) => {
    if (selected.value === 'others') {
      setStep(Object.keys(selections).indexOf(type) + 1.5);
      return;
    }

    const newSelections = { ...selections, [type]: selected };
    setSelections(newSelections);
    setStep(Object.keys(newSelections).findIndex(k => !newSelections[k]) + 1);
  };

  const handleAddCustomEntry = (type) => {
    if (customEntry.trim()) {
      hierarchyOptions[type].unshift({
        value: customEntry.toLowerCase().replace(/\s/g, '-'),
        label: customEntry
      });
      setSelections({ ...selections, [type]: { value: customEntry, label: customEntry } });
      setStep(Object.keys(selections).indexOf(type) + 2);
    }
    setCustomEntry('');
  };


  const handleClose = () => {
    setShowSubjectModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Course</h2>

        {/* Scrollable Content Area */}
        <div className="flex-1 pr-2">
          {/* Hierarchy Selection */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {['department', 'level', 'program', 'course','semester'].map((type, index) => (
              <div key={type} className={`${index < step ? 'opacity-100' : 'opacity-50'}`}>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
                <Select
                  options={hierarchyOptions[type]}
                  value={selections[type]}
                  onChange={(selected) => handleHierarchyChange(type, selected)}
                  isDisabled={index >= step}
                  styles={customSelectStyles}
                  placeholder={`Select ${type}`}
                />
                {step === index + 1.5 && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={customEntry}
                      onChange={(e) => setCustomEntry(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder={`Enter new ${type}`}
                    />
                    <button
                      onClick={() => handleAddCustomEntry(type)}
                      className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

      
         
        </div>

        {/* Fixed Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log('Course Created:', { selections, semesters });
              navigate("/admin/demo/classroom")
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            // disabled={!selections.course || semesters.length === 0}
          >
            View Class
          </button>
        </div>
        
      </div>
    </div>
  );
};

// Custom Select Styles
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

export default ViewClassroomModal;
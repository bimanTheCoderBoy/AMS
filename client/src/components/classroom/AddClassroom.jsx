import React, { useState } from 'react';

const AddClassroom = ({ showCreateModal, setShowCreateModal, handleCreate }) => {
  const [newClassroomName, setNewClassroomName] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [newProgram, setNewProgram] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newSemester, setNewSemester] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(newClassroomName, newDepartment, newLevel, newProgram, newCourse, newSemester);
    setNewClassroomName('');
    setNewDepartment('');
    setNewLevel('');
    setNewProgram('');
    setNewCourse('');
    setNewSemester('');
    setShowCreateModal(false);
  };

  return (
    showCreateModal && (
      <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Create New Classroom</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Classroom Name</label>
              <input
                type="text"
                value={newClassroomName}
                onChange={(e) => setNewClassroomName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Department</label>
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Level</label>
              <input
                type="text"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Program</label>
              <input
                type="text"
                value={newProgram}
                onChange={(e) => setNewProgram(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Course</label>
              <input
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Semester</label>
              <input
                type="text"
                value={newSemester}
                onChange={(e) => setNewSemester(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddClassroom;

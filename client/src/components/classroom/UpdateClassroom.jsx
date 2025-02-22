import React, { useState } from 'react';

const UpdateClassroom = ({ showEditModal, setShowEditModal, handleUpdateSubmit, selectedClassroom }) => {
  const [editedName, setEditedName] = useState(selectedClassroom?.name);
  const [editedDepartment, setEditedDepartment] = useState(selectedClassroom?.department);
  const [editedLevel, setEditedLevel] = useState(selectedClassroom?.level);
  const [editedProgram, setEditedProgram] = useState(selectedClassroom?.program);
  const [editedCourse, setEditedCourse] = useState(selectedClassroom?.course);
  const [editedSemester, setEditedSemester] = useState(selectedClassroom?.semester);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateSubmit(editedName, editedDepartment, editedLevel, editedProgram, editedCourse, editedSemester);
    setShowEditModal(false);
  };

  return (
    showEditModal && (
      <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Update Classroom</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Classroom Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Department</label>
              <input
                type="text"
                value={editedDepartment}
                onChange={(e) => setEditedDepartment(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Level</label>
              <input
                type="text"
                value={editedLevel}
                onChange={(e) => setEditedLevel(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Program</label>
              <input
                type="text"
                value={editedProgram}
                onChange={(e) => setEditedProgram(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Course</label>
              <input
                type="text"
                value={editedCourse}
                onChange={(e) => setEditedCourse(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Semester</label>
              <input
                type="text"
                value={editedSemester}
                onChange={(e) => setEditedSemester(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateClassroom;

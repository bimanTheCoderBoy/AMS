import React, { useState, useEffect, useRef } from 'react';

const ClassroomPage = () => {
  const [showMenu, setShowMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDepartment, setEditedDepartment] = useState('');
  const [editedLevel, setEditedLevel] = useState('');
  const [editedProgram, setEditedProgram] = useState('');
  const [editedCourse, setEditedCourse] = useState('');
  const [editedSemester, setEditedSemester] = useState('');
  const [newClassroomName, setNewClassroomName] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [newProgram, setNewProgram] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newSemester, setNewSemester] = useState('');
  const [classroomToDelete, setClassroomToDelete] = useState(null);
  const menuRef = useRef(null);
  const buttonRefs = useRef({});

  // Placeholder data for classrooms
  const [classrooms, setClassrooms] = useState([
    {
      id: 1,
      name: 'Classroom-1',
      department: 'CSE',
      level: 'UG',
      program: 'AICTE',
      course: 'CSBS',
      semester: '5th',
    },
    {
      id: 2,
      name: 'Classroom-2',
      department: 'CSE',
      level: 'UG',
      program: 'AICTE',
      course: 'CSBS',
      semester: '5th',
    },
    {
      id: 3,
      name: 'Classroom-3',
      department: 'ECE',
      level: 'PG',
      program: 'NEP',
      course: 'EE',
      semester: '8th',
    },
  ]);

  // Handle clicks outside the menu and modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isButton = Object.values(buttonRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );

      if (!isButton && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowCreateModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle 3-dot menu toggle
  const handleMenuToggle = (id, e) => {
    e.stopPropagation();
    setShowMenu((prev) => (prev === id ? null : id));
  };

  // Handle create new classroom
  const handleCreate = () => {
    if (
      newClassroomName.trim() &&
      newDepartment.trim() &&
      newLevel.trim() &&
      newProgram.trim() &&
      newCourse.trim() &&
      newSemester.trim()
    ) {
      const newClassroom = {
        id: Math.max(...classrooms.map((c) => c.id)) + 1,
        name: newClassroomName,
        department: newDepartment,
        level: newLevel,
        program: newProgram,
        course: newCourse,
        semester: newSemester,
      };
      setClassrooms([...classrooms, newClassroom]);
      setNewClassroomName('');
      setNewDepartment('');
      setNewLevel('');
      setNewProgram('');
      setNewCourse('');
      setNewSemester('');
      setShowCreateModal(false);
    }
  };

  // Handle update classroom
  const handleUpdate = (classroom) => {
    setSelectedClassroom(classroom);
    setEditedName(classroom.name);
    setEditedDepartment(classroom.department);
    setEditedLevel(classroom.level);
    setEditedProgram(classroom.program);
    setEditedCourse(classroom.course);
    setEditedSemester(classroom.semester);
    setShowEditModal(true);
    setShowMenu(null);
  };

  // Handle delete classroom
  const handleDeleteClick = (id) => {
    setClassroomToDelete(id);
    setShowDeleteModal(true);
    setShowMenu(null);
  };

  const handleConfirmDelete = () => {
    const updatedClassrooms = classrooms.filter((c) => c.id !== classroomToDelete);
    setClassrooms(updatedClassrooms);
    setShowDeleteModal(false);
    setClassroomToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setClassroomToDelete(null);
  };

  // Handle update submit
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedClassrooms = classrooms.map((c) =>
      c.id === selectedClassroom.id
        ? {
            ...c,
            name: editedName,
            department: editedDepartment,
            level: editedLevel,
            program: editedProgram,
            course: editedCourse,
            semester: editedSemester,
          }
        : c
    );
    setClassrooms(updatedClassrooms);
    setShowEditModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Classrooms</h1>

      {/* Display classrooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map((classroom) => (
          <div
            key={classroom.id}
            className="p-6 bg-white rounded-lg shadow-md relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{classroom.name}</h2>
                <p className="text-lg text-gray-600 mt-1">Department: {classroom.department}</p>
                <p className="text-lg text-gray-600 mt-1">Level: {classroom.level}</p>
                <p className="text-lg text-gray-600 mt-1">Program: {classroom.program}</p>
                <p className="text-lg text-gray-600 mt-1">Course: {classroom.course}</p>
                <p className="text-lg text-gray-600 mt-1">Semester: {classroom.semester}</p>
              </div>
              <button
                ref={(el) => (buttonRefs.current[classroom.id] = el)}
                onClick={(e) => handleMenuToggle(classroom.id, e)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>

            {/* Show menu on clicking 3 dot */}
            {showMenu === classroom.id && (
              <div
                ref={menuRef}
                className="absolute right-4 top-12 bg-white border rounded-lg hover:overflow-hidden shadow-lg z-10"
              >
                <button
                  onClick={() => handleUpdate(classroom)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(classroom.id)}
                  className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Classroom</h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Classroom</h2>
            <form onSubmit={handleUpdateSubmit}>
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
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Classroom</h2>
            <p className="mb-6">Are you sure you want to delete this classroom?</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plus icon to create new classroom */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

export default ClassroomPage;
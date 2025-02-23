import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import toast from "react-hot-toast";
import Dropdown from "./Dropdown";

const UpdateClassroom = ({
  showEditModal,
  setShowEditModal,
  selectedClassroom,
  handleupdateUIChnage,
}) => {
  const [editedName, setEditedName] = useState();
  const [editedDepartment, setEditedDepartment] = useState();
  const [editedLevel, setEditedLevel] = useState();
  const [editedProgram, setEditedProgram] = useState();
  const [editedCourse, setEditedCourse] = useState();
  const [editedSemester, setEditedSemester] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.put(
      `/admin/classrooms/${selectedClassroom?._id}`,
      {
        name: editedName,
        dept_id: editedDepartment,
        level_id: editedLevel,
        program_id: editedProgram,
        course_id: editedCourse,
        semester_id: editedSemester,
      }
    );

    if (response.status === 200) {
      toast.success("Classroom updated successfully");
      handleupdateUIChnage();
      setShowEditModal(false);
    } else {
      toast.error("Failed to update classroom");
    }

    setShowEditModal(false);
  };
  useEffect(() => {
    setEditedName((prev) => selectedClassroom?.name);
    setEditedDepartment((prev) => selectedClassroom?.department?._id);
    setEditedLevel((prev) => selectedClassroom?.level?._id);
    setEditedProgram((prev) => selectedClassroom?.program?._id);
    setEditedCourse((prev) => selectedClassroom?.course?._id);
    setEditedSemester((prev) => selectedClassroom?.semester?._id);
  }, [showEditModal]);
  return (
    showEditModal && (
      <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Update Classroom</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Classroom Name
              </label>

              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-transparent focus:border-blue-400 transition-colors placeholder-gray-400 focus:outline-none"
                placeholder="Enter classroom name"
                required
              />
            </div>
            <Dropdown
              label="Department"
              apiEndpoint="/admin/departments"
              selectedValue={editedDepartment}
              onChange={setEditedDepartment}
            />
            <Dropdown
              label="Level"
              apiEndpoint="/admin/levels"
              selectedValue={editedLevel}
              onChange={setEditedLevel}
            />
            <Dropdown
              label="Program"
              apiEndpoint="/admin/programs"
              selectedValue={editedProgram}
              onChange={setEditedProgram}
            />
            <Dropdown
              label="Course"
              apiEndpoint="/admin/courses"
              selectedValue={editedCourse}
              onChange={setEditedCourse}
            />
            <Dropdown
              label="Semester"
              apiEndpoint="/admin/semesters"
              selectedValue={editedSemester}
              onChange={setEditedSemester}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
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

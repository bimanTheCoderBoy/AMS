import React, { useState } from "react";
import Dropdown from "./Dropdown";
import api from "../../api/axiosConfig";
import toast from "react-hot-toast";
const AddClassroom = ({
  showCreateModal,
  setShowCreateModal,
  handleCreate,
}) => {
  const [newClassroomName, setNewClassroomName] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newProgram, setNewProgram] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newSemester, setNewSemester] = useState("");

  const handleSubmit = async (e) => {
    console.log(newClassroomName), console.log(newDepartment);

    e.preventDefault();
    const response = await api.post("/admin/classrooms", {
      name: newClassroomName,
      dept_id: newDepartment,
      level_id: newLevel,
      program_id: newProgram,
      course_id: newCourse,
      semester_id: newSemester,
    });

    if (response.status === 201) {
      handleCreate();
      setNewClassroomName("");
      setNewDepartment("");
      setNewLevel("");
      setNewProgram("");
      setNewCourse("");
      setNewSemester("");
      setShowCreateModal(false);
      toast.success("Classroom Added Successfully")
    }
  };

  return (
    showCreateModal && (
      <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Create New Classroom</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Classroom Name
              </label>
              <input
                type="text"
                value={newClassroomName}
                onChange={(e) => setNewClassroomName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <Dropdown
              label="Department"
              apiEndpoint="/admin/departments"
              selectedValue={newDepartment}
              onChange={setNewDepartment}
            />

            <Dropdown
              label="Level"
              apiEndpoint="/admin/levels"
              selectedValue={newLevel}
              onChange={setNewLevel}
            />

            <Dropdown
              label="Program"
              apiEndpoint="/admin/programs"
              selectedValue={newProgram}
              onChange={setNewProgram}
            />

            <Dropdown
              label="Course"
              apiEndpoint="/admin/courses"
              selectedValue={newCourse}
              onChange={setNewCourse}
            />

            <Dropdown
              label="Semester"
              apiEndpoint="/admin/semesters"
              selectedValue={newSemester}
              onChange={setNewSemester}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setNewClassroomName("");
                  setNewDepartment("");
                  setNewLevel("");
                  setNewProgram("");
                  setNewCourse("");
                  setNewSemester("");
                  setShowCreateModal(false);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
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

import React, { useState, useEffect, useRef } from "react";
import AddClassroom from "../components/classroom/AddClassroom";
import UpdateClassroom from "../components/classroom/UpdateClassroom";
import Loader from "../components/basic/Loader";
import api from "../api/axiosConfig";
import ClassroomCard from "../components/classroom/ClassroomCard";
import toast from "react-hot-toast";
const ClassroomPage = () => {
  const [showMenu, setShowMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
const [classroomToDelete,setClassroomToDelete]=useState(null)
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const menuRef = useRef(null);
  const buttonRefs = useRef({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Placeholder data for classrooms
  const [classrooms, setClassrooms] = useState([]);

  //fetch All classrooms
  const fetchAllClassrooms = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/classrooms");
      console.log(response?.data?.data);
      setClassrooms(response?.data?.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update item");
    }
  };
  useEffect(() => {
    fetchAllClassrooms();
  }, []);
  // Handle clicks outside the menu and modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isButton = Object.values(buttonRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );

      if (
        !isButton &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowCreateModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Handle 3-dot menu toggle
  const handleMenuToggle = (id, e) => {
    e.stopPropagation();
    setShowMenu((prev) => (prev === id ? null : id));
  };

  // Handle create new classroom
  const handleupdateUIChnage = () => {
    fetchAllClassrooms();
  };

  // Handle update classroom
  const handleUpdate = (classroom) => {
    setSelectedClassroom((prev)=>classroom);
    setShowEditModal(true);
    setShowMenu(null);
  };

  // Handle delete classroom
  const handleDeleteClick = (id) => {
    setClassroomToDelete(id);
    setShowDeleteModal(true);
    setShowMenu(null);
  };

  const handleConfirmDelete = async() => {
    const updatedClassrooms = classrooms.filter(
      (c) => c._id !== classroomToDelete
    );
    setClassrooms(updatedClassrooms);
    
    const response = await api.delete(`/admin/classrooms/${classroomToDelete}`);

    if (response.status === 200) {
      toast.success("Classroom Deleted successfully");
    } else {
      toast.error("Failed to delete classroom");
    }

   
    setShowDeleteModal(false);
    setClassroomToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setClassroomToDelete(null);
  };

  return (
    <>
      {loading ? (
       <div className="w-full flex items-center">
        <Loader loading={loading} />
        </div>

      ) : (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Classrooms</h1>

          {/* Display classrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <ClassroomCard
                classroom={classroom}
                buttonRefs={buttonRefs}
                handleMenuToggle={handleMenuToggle}
                menuRef={menuRef}
                handleUpdate={handleUpdate}
                handleDeleteClick={handleDeleteClick}
                showMenu={showMenu}
              />
            ))}
          </div>

          {/* Add Classroom Modal */}
          <AddClassroom 
        showCreateModal={showCreateModal} 
        setShowCreateModal={setShowCreateModal} 
        handleupdateUIChnage={handleupdateUIChnage} 
      />

          {/* Update Classroom Modal */}
          <UpdateClassroom
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            selectedClassroom={selectedClassroom}
            handleupdateUIChnage={handleupdateUIChnage}
          />

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Delete Classroom</h2>
                <p className="mb-6">
                  Are you sure you want to delete this classroom?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancelDelete}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Plus icon to create new classroom */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};



export default ClassroomPage;

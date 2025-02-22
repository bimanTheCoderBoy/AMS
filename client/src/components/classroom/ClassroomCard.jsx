import React from "react";

export default function ClassroomCard({
    classroom,
    buttonRefs,
    handleMenuToggle,
    menuRef,
    handleUpdate,
    handleDeleteClick,
    showMenu
  }) {
    return (
      <div
        key={classroom?._id}
        className="p-6 bg-white rounded-lg shadow-md relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{classroom.name}</h2>
            <p className="text-lg text-gray-600 mt-1">
              Department: {classroom?.department?.name}
            </p>
            <p className="text-lg text-gray-600 mt-1">
              Level: {classroom.level.name}
            </p>
            <p className="text-lg text-gray-600 mt-1">
              Program: {classroom.program.name}
            </p>
            <p className="text-lg text-gray-600 mt-1">
              Course: {classroom.course.name}
            </p>
            <p className="text-lg text-gray-600 mt-1">
              Semester: {classroom.semester.name}
            </p>
          </div>
          <button
            ref={(el) => (buttonRefs.current[classroom?._id] = el)}
            onClick={(e) => handleMenuToggle(classroom?._id, e)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer">
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
  
        {/* Show menu on clicking 3 dot */}
        {showMenu === classroom?._id && (
          <div
            ref={menuRef}
            className="absolute right-4 top-12 bg-white border rounded-lg hover:overflow-hidden shadow-lg z-10">
            <button
              onClick={() => handleUpdate(classroom)}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Update
            </button>
            <button
              onClick={() => handleDeleteClick(classroom?._id)}
              className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
import React from "react";
import { Link } from "react-router-dom";

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
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 relative group">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {classroom.name}
          </h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Department:</span>
              {classroom?.department?.name}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Level:</span>
              {classroom.level.name}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Program:</span>
              {classroom.program.name}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Course:</span>
              {classroom.course.name}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Semester:</span>
              {classroom.semester.name}
            </p>
          </div>
        </div>

        {/* 3-dot menu button */}
        <button
          ref={(el) => (buttonRefs.current[classroom?._id] = el)}
          onClick={(e) => handleMenuToggle(classroom?._id, e)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 -m-1 cursor-pointer"
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

      {/* Context menu */}
      {showMenu === classroom?._id && (
        <div
          ref={menuRef}
          className="absolute right-4 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden "
        >
          <button
            onClick={() => handleUpdate(classroom)}
            className="block w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteClick(classroom?._id)}
            className="block w-full px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 transition-colors text-left cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}

      {/* View button */}
      <Link
        to={`/admin/organization/classroom/${classroom._id}`}
        className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium shadow-sm"
      >
        View Details
      </Link>
    </div>
  );
}
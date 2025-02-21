import React from 'react';

const ClassroomCard = ({ 
  item, 
  handleMenuToggle, 
  showMenu, 
  menuRef, 
  buttonRefs, 
  handleUpdate, 
  handleDeleteClick 
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <div>
            <p className="text-lg text-gray-600 mt-1">Department : {item.department}</p>
            <p className="text-lg text-gray-600 mt-1">Level : {item.level}</p>
            <p className="text-lg text-gray-600 mt-1">Program : {item.program}</p>
            <p className="text-lg text-gray-600 mt-1">Course : {item.course}</p>
            <p className="text-lg text-gray-600 mt-1">Semester : {item.semester}</p>
          </div>
        </div>
        <button
          ref={el => buttonRefs.current[item.id] = el}
          onClick={(e) => handleMenuToggle(item.id, e)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {showMenu === item.id && (
        <div
          ref={menuRef}
          className="absolute right-4 top-12 bg-white border rounded-lg hover:overflow-hidden shadow-lg z-10"
        >
          <button
            onClick={() => handleUpdate(item)}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteClick(item.id)}
            className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassroomCard;
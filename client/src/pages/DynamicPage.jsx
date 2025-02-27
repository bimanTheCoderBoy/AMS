import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';



const DynamicPage = () => {
  const { entity } = useParams();
  const [showMenu, setShowMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const createModalRef = useRef(null);
  const buttonRefs = useRef({});
  const [newSubjectCode, setNewSubjectCode] = useState('');

  // Handle clicks outside the menu and modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isButton = Object.values(buttonRefs.current).some(
        ref => ref && ref.contains(event.target)
      );

      if (!isButton && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowEditModal(false);
      }

      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
        setShowDeleteModal(false);
      }

      if (createModalRef.current && !createModalRef.current.contains(event.target)) {
        setShowCreateModal(false);
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

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/admin/${entity}s`);

        setItems(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [entity]);


  const entityName = entity.charAt(0).toUpperCase() + entity.slice(1);

  const handleMenuToggle = (id, e) => {
    e.stopPropagation();
    setShowMenu(id);
  };

  const handleCreate = async () => {
    if (newItemName.trim()) {
      try {
        const payload = { name: newItemName };
        if (entity === 'subject') {
          payload.code = newSubjectCode;
        }
        
        const response = await api.post(`/admin/${entity}s`, payload);

        setItems([...items, response.data.data]);
        setNewItemName('');
        setNewSubjectCode('');
        setShowCreateModal(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to create item');
      }
    }
  };


  const handleUpdate = (item) => {
    setSelectedItem(item);
    setEditedName(item.name);
    setShowEditModal(true);
    setShowMenu(null);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
    setShowMenu(null);
  };

  const handleConfirmDelete = async (e) => {
   

    e.preventDefault();
    try {
      
      await api.delete(`/admin/${entity}s/${itemToDelete}`);

      const updatedItems = items.filter(item => item._id !== itemToDelete);
      setItems(updatedItems);
      setShowDeleteModal(false);
      setItemToDelete(null);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: editedName };
      if (entity === 'subject') {
        payload.code = selectedItem.code;
      }
      
      await api.put(`/admin/${entity}s/${selectedItem._id}`, payload);

      const updatedItems = items.map(item =>
        item._id === selectedItem._id ? { ...item, name: editedName } : item
      );
      setItems(updatedItems);
      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{entityName}</h1>

      {/* display section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Show code only for classroom */}
        {items.map(item => (
          <div
            key={item._id}
            className="p-6 bg-white rounded-lg shadow-md relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>

                {/* Show code only for subjects */}
                {entity === 'subject' && item.code && (
                  <p className="text-lg text-gray-600 mt-1">Code : {item.code}</p>
                )}
              </div>

              {/* 3 dot menu */}
              <button
                ref={el => buttonRefs.current[item._id] = el}
                onClick={(e) => handleMenuToggle(item._id, e)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            {/* Show menu on clicking 3 dot */}
            {showMenu === item._id && (
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
                  onClick={() => handleDeleteClick(item._id)}
                  className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div> 

      {/* update Modal */}
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update {entityName}</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full p-2 border-2 text-[#1e293b] border-gray-200 rounded-md focus:ring-2 focus:ring-transparent focus:border-blue-400 transition-colors placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
              {/* Add code field in edit modal for subjects */}
              {entity === 'subject' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={selectedItem?.code || ''}
                    onChange={(e) => setSelectedItem(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full p-2 border-2 text-[#1e293b] border-gray-200 rounded-md focus:ring-2 focus:ring-transparent focus:border-blue-400 transition-colors placeholder-gray-400 focus:outline-none"
                    required
                  />
                </div>
              )}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
          <div ref={deleteModalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete {entityName}</h2>
            <p className="mb-6">Are you sure you want to delete this {entity.toLowerCase()}?</p>
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
                onClick={(e)=>handleConfirmDelete(e)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 z-20">
          <div ref={createModalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New {entityName}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full p-2 border-2 text-[#1e293b] border-gray-200 rounded-md focus:ring-2 focus:ring-transparent focus:border-blue-400 transition-colors placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>

              {/* Add code field only for subjects */}
              {entity === 'subject' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={newSubjectCode}
                    onChange={(e) => setNewSubjectCode(e.target.value)}
                    className="w-full p-2 border-2 text-[#1e293b] border-gray-200 rounded-md focus:ring-2 focus:ring-transparent focus:border-blue-400 transition-colors placeholder-gray-400 focus:outline-none"
                    required={entity === 'subject'}
                  />
                </div>
              )}

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
      )}

      {/* plus icon to create new item */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );

};

export default DynamicPage;

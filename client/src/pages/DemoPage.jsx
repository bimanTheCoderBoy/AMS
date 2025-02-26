import React, { useState } from 'react';
import CreateCourseModal from '../components/classroom/CreateCourseModal';
import ViewClassroomModal from '../components/classroom/ViewClassroomModal';

const DemoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Demo Page</h1>
      <div className="grid grid-cols-8 gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-36 h-36 bg-blue-500 text-white cursor-pointer rounded flex items-center justify-center"
        >
          Create Course
        </button>
        <button
          onClick={() => setIsViewModalOpen(true)}
          className="w-36 h-36 bg-blue-500 text-white rounded cursor-pointer flex items-center justify-center"
        >
          View Classes
        </button>
      </div>
      <ViewClassroomModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
      <CreateCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        
    </div>
  );
};

export default DemoPage;

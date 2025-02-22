import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizationPage = () => {
  const navigate = useNavigate();
  
  const cards = [
    { title: 'Department', path: '/admin/organization/department' },
    { title: 'Level', path: '/admin/organization/level' },
    { title: 'Program', path: '/admin/organization/program' },
    { title: 'Course', path: '/admin/organization/course' },
    { title: 'Semester', path: '/admin/organization/semester' },
    { title: 'Subject', path: '/admin/organization/subject' },
    { title: 'Classroom', path: '/admin/organization/classroom' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Organization</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;

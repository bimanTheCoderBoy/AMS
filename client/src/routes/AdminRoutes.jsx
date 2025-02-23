import { Routes, Route } from 'react-router-dom';
import OrganizationPage from '../pages/OrganizationPage';
import DynamicPage from '../pages/DynamicPage';
import ClassroomPage from '../pages/ClassroomPage';
import DetailedClassroom from '../pages/DetailedClassroom';

const AdminRoutes = () => (
    <Routes>
       
        <Route path="/admin/organization" element={<OrganizationPage />} />
        <Route path="/admin/organization/:entity" element={<DynamicPage />} />
        <Route path="/admin/organization/classroom" element={<ClassroomPage />} />
        <Route path="/admin/organization/classroom/:id" element={<DetailedClassroom />} />
        <Route path="/admin/students" element={<div className="p-6">Student Page</div>} />
        <Route path="/admin/teachers" element={<div className="p-6">teacher page</div>} />
        <Route path="/admin/teave-days" element={<div className="p-6">Schedule Page</div>} />

    </Routes>
);

export default AdminRoutes;

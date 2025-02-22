import { Routes, Route } from 'react-router-dom';
import OrganizationPage from '../pages/OrganizationPage';
import DynamicPage from '../pages/DynamicPage';
import ClassroomPage from '../pages/ClassroomPage';

const AdminRoutes = () => (
    <Routes>
       
        <Route path="/admin/organization" element={<OrganizationPage />} />
        <Route path="/admin/organization/:entity" element={<DynamicPage />} />
        <Route path="/admin/organization/classroom" element={<ClassroomPage />} />
        <Route path="/admin/student" element={<div className="p-6">Student Page</div>} />
        <Route path="/admin/schedule" element={<div className="p-6">Schedule Page</div>} />

    </Routes>
);

export default AdminRoutes;

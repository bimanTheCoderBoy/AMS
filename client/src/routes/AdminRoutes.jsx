import { Routes, Route } from 'react-router-dom';
import OrganizationPage from '../pages/OrganizationPage';
import DynamicPage from '../pages/DynamicPage';
import ClassroomPage from '../pages/ClassroomPage';

const AdminRoutes = () => (
    <Routes>
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/organization/:entity" element={<DynamicPage />} />
        <Route path="/organization/classroom" element={<ClassroomPage />} />
        <Route path="/student" element={<div className="p-6">Student Page</div>} />
        <Route path="/schedule" element={<div className="p-6">Schedule Page</div>} />
    </Routes>
);

export default AdminRoutes;

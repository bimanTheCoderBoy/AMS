
import './App.css';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import AdminRoutes from './routes/AdminRoutes';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <ProtectedRoutes />
    <Toaster/>
    </>
  );
}

export default App;

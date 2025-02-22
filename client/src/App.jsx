
import './App.css';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import AdminRoutes from './routes/AdminRoutes';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  return (
    <ProtectedRoutes />
    
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-gray-100">
            <AdminRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

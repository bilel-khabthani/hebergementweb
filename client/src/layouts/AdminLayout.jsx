import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.png';

const AdminLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className={`h-full w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
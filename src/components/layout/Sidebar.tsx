import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Bookmark, User, TrendingUp, LogOut, Moon, Sun } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, theme, setTheme, logout } = useApp();
  
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Search size={24} />, label: 'Explore', path: '/explore' },
    { icon: <TrendingUp size={24} />, label: 'Trends', path: '/trends' },
    { icon: <Bookmark size={24} />, label: 'Bookmarks', path: '/bookmarks' },
    { icon: <User size={24} />, label: 'Profile', path: `/profile/${currentUser?.id}` },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8 pl-4">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-2 rounded-md mr-2">
            <TrendingUp size={20} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            FinChat
          </h1>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center p-3 rounded-full w-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  location.pathname === item.path ? 'font-medium text-blue-500' : ''
                }`}
              >
                <span className="mr-4">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto mb-8">
        <button
          onClick={handleThemeToggle}
          className="flex items-center p-3 rounded-full w-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <span className="mr-4">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </span>
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        {currentUser && (
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-full w-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 text-red-500"
          >
            <span className="mr-4">
              <LogOut size={24} />
            </span>
            <span>Log Out</span>
          </button>
        )}

        {currentUser && (
          <div className="flex items-center mt-4 p-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{currentUser.username}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
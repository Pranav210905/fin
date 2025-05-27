import React from 'react';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import { useApp } from '../../contexts/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, currentUser } = useApp();
  
  if (!currentUser) {
    return <>{children}</>;
  }
  
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-11 gap-0">
            <div className="hidden md:block md:col-span-2 lg:col-span-2">
              <div className="sticky top-0 h-screen overflow-y-auto py-4 pr-4">
                <Sidebar />
              </div>
            </div>
            <main className="col-span-1 md:col-span-6 lg:col-span-6 border-x border-gray-200 dark:border-gray-800 min-h-screen">
              {children}
            </main>
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-0 h-screen overflow-y-auto py-4 pl-4">
                <RightPanel />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden z-10">
          <div className="flex justify-around items-center p-3">
            <MobileNavItem icon="home" label="Home" />
            <MobileNavItem icon="search" label="Explore" />
            <MobileNavItem icon="bookmark" label="Saved" />
            <MobileNavItem icon="user" label="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNavItem: React.FC<{ icon: string; label: string }> = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center justify-center p-2">
      <span className="text-blue-500">
        {icon === 'home' && '🏠'}
        {icon === 'search' && '🔍'}
        {icon === 'bookmark' && '🔖'}
        {icon === 'user' && '👤'}
      </span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  // Check if we're on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setSidebarOpen(window.innerWidth > 768); // Sidebar open by default on desktop
    };

    // Check on mount
    checkIfMobile();

    // Check on resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Projetos', icon: '📋' },
    { name: 'Relatórios', icon: '📈' },
    { name: 'Cronograma', icon: '📅' },
    { name: 'Indicadores', icon: '🎯' },
    { name: 'Usuários', icon: '👥' },
  ];

  const topMenuItems = [
    { name: 'Cadastrar Projeto', action: '#projetos' },
    { name: 'Cadastrar Concessionária', action: '#concessionarias' },
    { name: 'Cadastrar Usuário', action: '#usuarios' },
    { name: 'Configurações', action: '#config' },
    { name: `Perfil: ${user?.name}`, action: '#perfil' },
    { name: 'Sair', action: '#sair', onClick: logout },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header-fixed">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 mr-4 md:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-primary-900">SIGPRO</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {topMenuItems.map((item) => (
              <button
                key={item.name}
                onClick={item.onClick}
                href={item.action}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  item.name === 'Sair'
                    ? 'text-red-600 hover:text-red-800'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile when collapsed */}
        <aside className={`sidebar ${sidebarOpen ? '' : 'hidden md:block'} transition-all duration-300`}>
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="hidden md:inline">{item.name}</span>
                </a>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300 p-6`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊', route: '/dashboard' },
    { name: 'Projetos', icon: '📋', route: '/register-project' },
    { name: 'Relatórios', icon: '📈', route: '#' },
    { name: 'Cronograma', icon: '📅', route: '#' },
    { name: 'Indicadores', icon: '🎯', route: '#' },
    { name: 'Usuários', icon: '👥', route: '#' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const topMenuItems = [
    { name: 'Cadastrar Projeto', action: () => navigate('/register-project') },
    { name: 'Cadastrar Concessionária', action: () => navigate('/register-concessionaire') },
    { name: 'Cadastrar Usuário', action: () => navigate('#') },
    { name: 'Configurações', action: () => navigate('#') },
    { name: `Perfil: ${user?.name}`, action: () => navigate('#') },
    { name: 'Sair', action: handleLogout, style: 'text-red-600 hover:text-red-800' },
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
          
          <div className="hidden md:flex items-center space-x-4">
            {topMenuItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`px-3 py-2 rounded-md text-sm font-medium ${item.style || 'text-gray-700 hover:text-gray-900'}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-14 left-0 h-full w-64 bg-white shadow-lg z-40 transition-all duration-300 overflow-y-auto" style={{ display: sidebarOpen ? 'block' : 'none' }}>
          <nav className="mt-4">
            <div className="px-4 space-y-1">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.route)}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 px-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Empresas</p>
              <div className="mt-2 space-y-1">
                {['HOUER', 'SOLUÇÕES INFRA', 'INFRA S.A.'].map((emp) => (
                  <button
                    key={emp}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  >
                    <span className="mr-3">🏢</span>
                    <span>{emp}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 px-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Concessionárias</p>
              <div className="mt-2 space-y-1">
                {['Motiva Pantanal', 'ECO101 Capixaba', 'Autopista Fluminense'].map((conc) => (
                  <button
                    key={conc}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  >
                    <span className="mr-3">🏗️</span>
                    <span>{conc}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 p-4 md:p-6 mt-14 ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
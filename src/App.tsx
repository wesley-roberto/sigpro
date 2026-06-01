import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import ProjectRegisterPage from './pages/ProjectRegisterPage'
import CompanyRegisterPage from './pages/CompanyRegisterPage'
import ConcessionaireRegisterPage from './pages/ConcessionaireRegisterPage'

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register-project" element={<ProjectRegisterPage />} />
        <Route path="/register-company" element={<CompanyRegisterPage />} />
        <Route path="/register-concessionaire" element={<ConcessionaireRegisterPage />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
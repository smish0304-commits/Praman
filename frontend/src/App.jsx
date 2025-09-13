import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import ContributorPage from './pages/ContributorPage'
import ConsumerPage from './pages/ConsumerPage'
import DashboardPage from './pages/DashboardPage'
import RegistrationPage from './pages/RegistrationPage'
import DetailsPage from './pages/Details' // ✅ Import for the new Details page
import DataManager from './components/DataManager'
import { ToastProvider } from './contexts/ToastContext'
import './utils/mockApi' // Local storage mock DB

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />

          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/contributor" element={<ContributorPage />} />
            <Route path="/register/:roleId" element={<RegistrationPage />} />
            <Route path="/dashboard/:roleId" element={<DashboardPage />} />
            <Route path="/consumer" element={<ConsumerPage />} />
            <Route path="/details" element={<DetailsPage />} /> {/* ✅ New route */}
          </Routes>

          <Footer />
          <DataManager />
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App

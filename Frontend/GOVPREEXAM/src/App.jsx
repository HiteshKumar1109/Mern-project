import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MockTests from './pages/MockTests';
import TestDetail from './pages/TestDetail';
import TakeTest from './pages/TakeTest';
import TestResult from './pages/TestResult';
import CurrentAffairs from './pages/CurrentAffairs';
import ExamPage from './pages/ExamPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/" />;
}

function AppContent() {
  return (
    <div className="App">
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mock-tests" element={<MockTests />} />
        <Route path="/test/:testId" element={<TestDetail />} />
        <Route path="/take-test/:testId" element={<PrivateRoute><TakeTest /></PrivateRoute>} />
        <Route path="/result/:attemptId" element={<PrivateRoute><TestResult /></PrivateRoute>} />
        <Route path="/current-affairs" element={<CurrentAffairs />} />
        <Route path="/exam/:examType" element={<ExamPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

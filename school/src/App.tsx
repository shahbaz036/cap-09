import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/store';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import NewsEvents from './components/home/NewsEvents';
import QuickLinks from './components/home/QuickLinks';
import Footer from './components/layout/Footer';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/admin/Dashboard';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Academics from './components/academics/Academics';
import Admissions from './components/admissions/Admissions';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Hero />
                <NewsEvents />
                <QuickLinks />
              </main>
              <Footer />
            </div>
          }
        />
        <Route 
          path="/about" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <About />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/academics" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <Academics />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/admissions" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <Admissions />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
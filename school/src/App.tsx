import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/store';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import AboutNests from './components/home/AboutNests';
import ImportantLinks from './components/home/ImportantLinks';
import Footer from './components/layout/Footer';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/admin/Dashboard';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Academics from './components/academics/Academics';
import Administration from './components/administration/Administration';
import Activities from './components/activities/Activities';
import Gallery from './components/gallery/Gallery';
import PublicDisclosure from './components/disclosure/PublicDisclosure';
import ExternalLinks from './components/links/ExternalLinks';

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
            <div className="min-h-screen flex flex-col bg-white">
              <Header />
              <main className="flex-grow">
                <Hero />
                <div className="space-y-8">
                  <AboutNests />
                  <PublicDisclosure isHomePage={true} />
                  <ImportantLinks />
                </div>
              </main>
              <Footer />
            </div>
          }
        />
        <Route 
          path="/about-us" 
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
          path="/administration" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <Administration />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/activities" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <Activities />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/gallery" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <Gallery />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/public-disclosure" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <PublicDisclosure />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/external-links" 
          element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <ExternalLinks />
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

export default App
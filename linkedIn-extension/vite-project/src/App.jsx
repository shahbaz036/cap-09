import React, { useState, useEffect } from 'react';
import './popup.css';

const Login = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        chrome.storage.local.set({ token: data.token, user: JSON.stringify(data.user) }, () => {
          onLogin(data.user);
          onNavigate('welcome');
        });
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? 
        <button onClick={() => onNavigate('signup')} className="link-button">
          Sign up
        </button>
      </p>
    </div>
  );
};

const Signup = ({ onSignup, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        onSignup(data.user);
        onNavigate('login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit" className="signup-button" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p className="login-link">
        Already have an account? 
        <button onClick={() => onNavigate('login')} className="link-button">
          Log in
        </button>
      </p>
    </div>
  );
};

const Home = ({ onNavigate }) => {
  return (
    <div className="home-container">
      <h1>Welcome to LinkedIn Automation Tool</h1>
      <div className="button-container">
        <button onClick={() => onNavigate('signup')} className="home-button">Sign Up</button>
        <button onClick={() => onNavigate('login')} className="home-button">Login</button>
      </div>
    </div>
  );
};

const Welcome = ({ user, onLogout, onNavigate }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome, {user.email}!</h1>
      <p>You're successfully logged in to the LinkedIn Automation Tool.</p>
      <p>The extension icon should now be visible on your LinkedIn profile.</p>
      <button onClick={() => onNavigate('settings')} className="settings-button">Settings</button>
      <button onClick={onLogout} className="logout-button">Logout</button>
    </div>
  );
};

const Settings = ({ onNavigate }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isConnectingLinkedIn, setIsConnectingLinkedIn] = useState(false);
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['linkedInConnected'], function(result) {
      if (result.linkedInConnected) {
        setIsLinkedInConnected(true);
      }
    });
  }, []);

  const handleConnectLinkedIn = async () => {
    setIsConnectingLinkedIn(true);
    setError('');
    try {
      const result = await chrome.storage.local.get('token');
      if (!result.token) {
        throw new Error('User not logged in');
      }
      const response = await fetch('http://localhost:5000/api/linkedin/auth', {
        headers: {
          'Authorization': `Bearer ${result.token}`
        }
      });
      const data = await response.json();
      if (data.authUrl) {
        chrome.tabs.create({ url: data.authUrl });
      } else {
        throw new Error('Failed to initiate LinkedIn connection');
      }
    } catch (error) {
      setError(error.message || 'Failed to initiate LinkedIn connection');
    } finally {
      setIsConnectingLinkedIn(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button 
        onClick={handleConnectLinkedIn} 
        disabled={isConnectingLinkedIn || isLinkedInConnected}
        className="connect-linkedin-button"
      >
        {isLinkedInConnected ? 'LinkedIn Connected' : (isConnectingLinkedIn ? 'Connecting...' : 'Connect LinkedIn Account')}
      </button>
      <button onClick={() => onNavigate('welcome')} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const result = await new Promise((resolve) => {
          chrome.storage.local.get(['user', 'token'], resolve);
        });
        if (result.user && result.token) {
          setUser(JSON.parse(result.user));
          setCurrentPage('welcome');
          chrome.runtime.sendMessage({ action: "showIcon" });
        }
      } catch (error) {
        console.error('Error accessing chrome storage:', error);
      }
      setIsLoading(false);
    };

    checkUserLogin();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('welcome');
  };

  const handleSignup = (userData) => {
    console.log('User signed up:', userData);
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setUser(null);
    chrome.storage.local.remove(['user', 'token'], () => {
      console.log('User data removed from chrome.storage.local');
      chrome.runtime.sendMessage({ action: "hideIcon" });
    });
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'signup':
        return <Signup onSignup={handleSignup} onNavigate={handleNavigate} />;
      case 'welcome':
        return <Welcome user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
};

export default App;
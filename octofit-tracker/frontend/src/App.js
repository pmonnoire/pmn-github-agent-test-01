import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Users from './components/Users';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  const features = [
    {
      icon: '👥',
      title: 'Users',
      description: 'Manage and view all registered users in the system',
      path: '/users',
      color: 'primary'
    },
    {
      icon: '🏆',
      title: 'Teams',
      description: 'Create and manage competitive teams',
      path: '/teams',
      color: 'warning'
    },
    {
      icon: '📋',
      title: 'Activities',
      description: 'Track various fitness activities',
      path: '/activities',
      color: 'info'
    },
    {
      icon: '💪',
      title: 'Workouts',
      description: 'Log and monitor your workout sessions',
      path: '/workouts',
      color: 'danger'
    },
    {
      icon: '🏅',
      title: 'Leaderboard',
      description: 'View competitive rankings and scores',
      path: '/leaderboard',
      color: 'success'
    }
  ];

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
          <div className="container-xl">
            <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="navbar-logo me-3"
                width="40"
                height="40"
              />
              <span className="brand-text">OctoFit Tracker</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏆 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    📋 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏅 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="home-container">
                <div className="hero-section">
                  <div className="container-xl">
                    <div className="hero-content">
                      <h1 className="display-3 fw-bold mb-4">Welcome to OctoFit Tracker</h1>
                      <p className="lead mb-4">
                        Your comprehensive fitness tracking and team competition platform
                      </p>
                      <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <strong>API Endpoint:</strong> https://
                        {process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-xl py-5">
                  <div className="row g-4">
                    {features.map((feature, index) => (
                      <div key={index} className="col-md-6 col-lg-4">
                        <Link to={feature.path} className="text-decoration-none">
                          <div className={`card h-100 shadow-sm hover-card border-0`}>
                            <div className={`card-header bg-${feature.color} border-0`}>
                              <div className="feature-icon">{feature.icon}</div>
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">{feature.title}</h5>
                              <p className="card-text text-muted">{feature.description}</p>
                              <button className={`btn btn-${feature.color} btn-sm`}>
                                Explore {feature.title}
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="container-xl py-5 bg-light">
                  <h2 className="text-center mb-5">Features</h2>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="feature-list">
                        <h5>✅ Track Your Progress</h5>
                        <p>Log activities and workouts to monitor your fitness journey in real-time.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-list">
                        <h5>🏆 Compete with Teams</h5>
                        <p>Create teams and compete on the leaderboard with friends and colleagues.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-list">
                        <h5>📊 View Analytics</h5>
                        <p>Get detailed insights into your fitness activities and performance metrics.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-list">
                        <h5>🌟 Community Driven</h5>
                        <p>Connect with other fitness enthusiasts and build a supportive community.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>

        <footer className="footer bg-dark text-white text-center py-4 mt-5 border-top border-secondary">
          <div className="container">
            <div className="footer-content">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="footer-logo me-2"
                width="30"
                height="30"
              />
              <span className="fw-bold">OctoFit Tracker</span> &copy; 2024. All rights reserved.
            </div>
            <small className="text-muted d-block mt-2">Powered by React & Django REST Framework</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;
  const API_ENDPOINT = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching workouts from:', API_ENDPOINT);
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        console.log('Workouts data set to:', workoutsData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
        <p className="mt-3">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="component-header mb-4">
        <h1 className="display-5">💪 Workouts</h1>
        <p className="text-muted">Track your fitness workouts and progress</p>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <strong>No workouts found.</strong> Log your first workout to get started!
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-gradient border-0">
            <h5 className="card-title mb-0">Total Workouts: {workouts.length}</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr className="table-dark">
                    <th scope="col" style={{ width: '10%' }}>ID</th>
                    <th scope="col" style={{ width: '25%' }}>Workout Name</th>
                    <th scope="col" style={{ width: '20%' }}>Type</th>
                    <th scope="col" style={{ width: '20%' }}>Duration</th>
                    <th scope="col" style={{ width: '25%' }}>Calories Burned</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id} className={index % 2 === 0 ? '' : 'table-light'}>
                      <td>
                        <span className="badge bg-danger">{workout.id}</span>
                      </td>
                      <td>
                        <strong>{workout.name}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">{workout.type || 'General'}</span>
                      </td>
                      <td>{workout.duration ? `${workout.duration} min` : 'N/A'}</td>
                      <td>
                        <strong>{workout.calories ? `${workout.calories} kcal` : 'N/A'}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;

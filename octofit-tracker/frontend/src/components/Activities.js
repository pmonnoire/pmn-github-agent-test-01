import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;
  const API_ENDPOINT = `${API_BASE_URL}/activities/`;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from:', API_ENDPOINT);
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        console.log('Activities data set to:', activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading activities...</span>
        </div>
        <p className="mt-3">Loading activities...</p>
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
        <h1 className="display-5">📋 Activities</h1>
        <p className="text-muted">Browse all available activities</p>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <strong>No activities found.</strong> Start logging your activities to see them here.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-gradient border-0">
            <h5 className="card-title mb-0">Total Activities: {activities.length}</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr className="table-dark">
                    <th scope="col" style={{ width: '10%' }}>ID</th>
                    <th scope="col" style={{ width: '25%' }}>Activity Name</th>
                    <th scope="col" style={{ width: '45%' }}>Description</th>
                    <th scope="col" style={{ width: '20%' }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id} className={index % 2 === 0 ? '' : 'table-light'}>
                      <td>
                        <span className="badge bg-primary">{activity.id}</span>
                      </td>
                      <td>
                        <strong>{activity.name}</strong>
                      </td>
                      <td className="text-muted">{activity.description || 'N/A'}</td>
                      <td>
                        <span className="badge bg-info text-dark">{activity.type || 'General'}</span>
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

export default Activities;

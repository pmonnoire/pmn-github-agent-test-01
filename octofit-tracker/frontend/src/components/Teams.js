import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;
  const API_ENDPOINT = `${API_BASE_URL}/teams/`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams from:', API_ENDPOINT);
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        console.log('Teams data set to:', teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading teams...</span>
        </div>
        <p className="mt-3">Loading teams...</p>
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
        <h1 className="display-5">🏆 Teams</h1>
        <p className="text-muted">View and manage competitive teams</p>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <strong>No teams found.</strong> Create a team to start competing!
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-gradient border-0">
            <h5 className="card-title mb-0">Total Teams: {teams.length}</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr className="table-dark">
                    <th scope="col" style={{ width: '10%' }}>ID</th>
                    <th scope="col" style={{ width: '25%' }}>Team Name</th>
                    <th scope="col" style={{ width: '45%' }}>Description</th>
                    <th scope="col" style={{ width: '20%' }}>Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id} className={index % 2 === 0 ? '' : 'table-light'}>
                      <td>
                        <span className="badge bg-warning text-dark">{team.id}</span>
                      </td>
                      <td>
                        <strong>{team.name}</strong>
                      </td>
                      <td className="text-muted">{team.description || 'N/A'}</td>
                      <td>
                        <span className="badge bg-secondary">{team.members_count || 0}</span>
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

export default Teams;

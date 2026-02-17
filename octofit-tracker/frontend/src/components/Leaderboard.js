import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;
  const API_ENDPOINT = `${API_BASE_URL}/leaderboard/`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard from:', API_ENDPOINT);
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        console.log('Leaderboard data set to:', leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
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

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-info text-dark';
    return 'bg-light text-dark';
  };

  const getRankAward = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="component-header mb-4">
        <h1 className="display-5">🏅 Leaderboard</h1>
        <p className="text-muted">Top performers and competitive rankings</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <strong>No leaderboard data available.</strong> Complete workouts and activities to appear on the leaderboard!
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-gradient border-0">
            <h5 className="card-title mb-0">Top {leaderboard.length} Competitors</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr className="table-dark">
                    <th scope="col" style={{ width: '10%', textAlign: 'center' }}>Rank</th>
                    <th scope="col" style={{ width: '25%' }}>User</th>
                    <th scope="col" style={{ width: '25%' }}>Team</th>
                    <th scope="col" style={{ width: '20%', textAlign: 'center' }}>Points</th>
                    <th scope="col" style={{ width: '20%', textAlign: 'center' }}>Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    const badgeColor = getRankBadgeColor(rank);
                    const award = getRankAward(rank);
                    return (
                      <tr key={entry.id || index} className={rank <= 3 ? 'table-light' : ''}>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`badge ${badgeColor} fs-5`}>
                            {award} {rank}
                          </span>
                        </td>
                        <td>
                          <strong>
                            {entry.username || entry.user_name || entry.name || 'Unknown'}
                          </strong>
                        </td>
                        <td>
                          <span className="badge bg-primary">
                            {entry.team_name || entry.team || 'No Team'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <strong className="text-success">
                            {entry.points || entry.score || 0}
                          </strong>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="badge bg-info text-dark">
                            {entry.activity_count || entry.activities || 0}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

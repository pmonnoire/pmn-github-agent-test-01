import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;
  const API_ENDPOINT = `${API_BASE_URL}/users/`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', API_ENDPOINT);
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        console.log('Users data set to:', usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
        <p className="mt-3">Loading users...</p>
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
        <h1 className="display-5">👥 Users</h1>
        <p className="text-muted">Manage and view all registered users</p>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <strong>No users found.</strong> Register new users to see them here.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-gradient border-0">
            <h5 className="card-title mb-0">Total Users: {users.length}</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr className="table-dark">
                    <th scope="col" style={{ width: '10%' }}>ID</th>
                    <th scope="col" style={{ width: '20%' }}>Username</th>
                    <th scope="col" style={{ width: '25%' }}>Email</th>
                    <th scope="col" style={{ width: '20%' }}>First Name</th>
                    <th scope="col" style={{ width: '25%' }}>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? '' : 'table-light'}>
                      <td>
                        <span className="badge bg-success">{user.id}</span>
                      </td>
                      <td>
                        <strong>@{user.username}</strong>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                      </td>
                      <td className="text-muted">{user.first_name || '-'}</td>
                      <td className="text-muted">{user.last_name || '-'}</td>
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

export default Users;

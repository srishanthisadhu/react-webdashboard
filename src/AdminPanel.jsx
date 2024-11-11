import React, { useState, useEffect } from 'react';
import './css/AdminPanel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminPanel(){

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [role, setRole] = useState('student'); // Change default role to 'student'

  // Fetch users from the API

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.178.150:5050/admin/all_users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('Failed to fetch users.');
      }
    } catch (error) {
      toast.error('Error fetching users: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (username && email && password) {
      const newUser = {
        username,
        password,
        email,
        role,
      };

      try {
        const response = await fetch('http://192.168.178.150:5050/admin/create_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const createdUser = await response.json();
          setUsers([...users, createdUser]);
          toast.success('User created successfully!');
          resetForm();
          fetchUsers();
        } else {
          toast.error('Failed to create user.');
        }
      } catch (error) {
        toast.error('Error: ' + error.message);
      }
    } else {
      toast.warn('Please fill in all fields.');
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('student');
  };

  const deleteUser = async (username) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the user: ${username}?`);
    if (confirmDelete) {

      const encodedUsername = encodeURIComponent(username);
      try {
        const response = await fetch(`http://192.168.178.150:5050/admin/delete_user/${encodedUsername}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUsers(users.filter(user => user.username !== username));
          toast.success('User deleted successfully!');
        } else {
          toast.error('Failed to delete user.');
        }
      } catch (error) {
        toast.error('Error deleting user: ' + error.message);
      }
    }
  };

  const resetPassword = async () => {
    if (selectedUserId) {
      const newPassword = prompt('Enter new password:');
      if (newPassword) {
        const selectedUser = users.find(user => user.id === selectedUserId);
        const payload = {
          username: selectedUser.username,
          new_password: newPassword,
        };

        try {
          const response = await fetch('http://192.168.178.150:5050/admin/reset_password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            toast.success('Password reset successfully!');
          } else {
            toast.error('Failed to reset password.');
          }
        } catch (error) {
          toast.error('Error resetting password: ' + error.message);
        }
      }
    } else {
      toast.warn('Please select a user to reset the password.');
    }
  };

  const handleUserSelection = (id, username) => {
    setSelectedUserId(id);
    setSelectedUsername(username);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <h2>Create New User</h2>
      <table className="user-form">
        <tbody>
          <tr>
            <td><label>Username:</label></td>
            <td>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </td>
          </tr>
          <tr>
            <td><label>Email:</label></td>
            <td>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </td>
          </tr>
          <tr>
            <td><label>Password:</label></td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </td>
          </tr>
          <tr>
            <td><label>Role:</label></td>
            <td>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <button className="create-button" onClick={addUser}>Create User</button>
              <button className="reset-button" onClick={resetForm}>Reset</button>

            </td>
          </tr>
        </tbody>
      </table>

      <h2>All Users</h2>
      <table className="user-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => handleUserSelection(user.id, user.username)} style={{ cursor: 'pointer', backgroundColor: selectedUserId === user.id ? '#e0e0e0' : 'transparent' }}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="delete-button" onClick={() => deleteUser(user.username)}>Delete</button>
                <button className="reset-password-button" onClick={resetPassword}>Reset Password</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default AdminPanel;

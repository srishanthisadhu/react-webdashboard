import React, { useState } from "react";
import "./css/ChangePassword.css";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    // Prepare the payload
    const payload = {
      username,
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await fetch(
        "http://localhost:5050/admin/reset_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert(`Password for ${username} has been changed!`);
        // Reset form fields
        setUsername("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to change password.");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="change-password">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <table className="user-form">
          <tbody>
            <tr>
              <td>
                <label>Username:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Old Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>New Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Confirm New Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </td>
            </tr>
            {error && (
              <tr>
                <td colSpan="2" className="error">
                  {error}
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="2">
                <div className="button-container">
                  <button type="submit" className="create-button">
                    Change Password
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ChangePassword;

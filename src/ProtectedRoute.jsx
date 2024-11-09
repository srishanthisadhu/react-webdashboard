import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const checkAuth = () => {
  console.log("Retrieving authentication token from local storage...");
  const auth = localStorage.getItem("auth");
  if (!auth) {
    console.log("No authentication token found.");
    return false;
  }

  const authObj = JSON.parse(auth);
  const expires = new Date(authObj.expires);
  console.log(`Token expiration time: ${expires}, Current time: ${new Date()}`);

  if (expires < new Date()) {
    console.log("Authentication token has expired.");
    localStorage.removeItem("auth");
    return false;
  }

  console.log("Authentication token is valid.");
  return authObj.isAuthenticated;
};

const ProtectedRoute = ({ children }) => {
  console.log("Checking authentication status");
  if (!checkAuth()) {
    console.log("Authentication failed or session expired");
    return <Navigate to="/login" replace />;
  }

  console.log("Authentication successful, rendering children");
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // `node` covers anything that can be rendered: numbers, strings, elements or an array containing these types.
};

export default ProtectedRoute;

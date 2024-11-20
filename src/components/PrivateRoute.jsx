// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const { access, loading, error } = useSelector((state) => state.auth);

  // Check if the user is authenticated by verifying the presence of the access token
  const isAuthenticated = access !== null;

  // Loading state (e.g., during the API call for user authentication)
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state (e.g., if there was an error during login or fetching authentication data)
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ message: "Not logged in. Please login." }} />;
  }

  // If authenticated, render the protected route element
  return element;
};

export default PrivateRoute;

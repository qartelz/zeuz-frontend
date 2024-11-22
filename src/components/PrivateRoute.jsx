
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const { access, loading, error } = useSelector((state) => state.auth);

  const isAuthenticated =
    access !== null 
    // || JSON.parse(localStorage.getItem("authData"))?.access;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ message: "Not logged in. Please login." }}
      />
    );
  }

  return element;
};

export default PrivateRoute;

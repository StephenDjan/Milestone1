import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./providers/UserContext";

const AdminPage = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not logged in or not an admin
    if (!userInfo || !userInfo.admin) {
      alert("You do not have access to this page.");
      navigate("/"); // Redirect to homepage or another route
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.admin) {
    return <p>Loading...</p>; // You can show a loader or redirect the user
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {userInfo.username}! You have admin privileges.</p>
      {/* You can add admin functionalities here */}
    </div>
  );
};

export default AdminPage;

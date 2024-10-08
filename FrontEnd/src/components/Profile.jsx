import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from "./providers/UserContext";
import './profile.css'; // Import the CSS file

const Profile = () => {
  const {userInfo, setUserInfo} = useContext(UserContext)

    // console.log(userInfo)
//   useEffect(() => {
//     // Replace with your actual API endpoint to get user data
//     axios.get('http://localhost:5000/api/profile') 
//       .then(response => {
//         setUserData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {userInfo.username}</p>
      <p>Email: {userInfo.email}</p>
      <p>Email: {userInfo.email}</p>
      {/* Display other user details */}
    </div>
  );
};

export default Profile;

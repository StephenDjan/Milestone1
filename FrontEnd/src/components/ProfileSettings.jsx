import React, { useState } from "react";
import axios from "axios";

const ProfileSettings = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put("http://localhost:5000/update-profile", {
                email,
                password,
            });

            if (response.data.success) {
                alert("Profile updated successfully");
            } else {
                alert("Update failed");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="New Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileSettings;

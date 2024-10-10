import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "./providers/UserContext";

const ProfileSettings = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        city: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userInfo) {
            setFormData({
                username: userInfo.username || "",
                email: userInfo.email || "",
                phone: userInfo.phone || "",
                city: userInfo.city || ""
            });
            setIsLoading(false);  // Done loading after userInfo is set
        }
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Disable submit button

        try {
            const response = await axios.post("http://localhost:5000/api/profile", formData);
            if (response.data.success) {
                setUserInfo(response.data.user); // Update context with the new user info
                alert("Profile updated successfully");
            } else {
                alert("Update failed");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
        }
    };

    if (isLoading) {
        return <p>Loading profile...</p>; // Display loading state until data is available
    }

    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;

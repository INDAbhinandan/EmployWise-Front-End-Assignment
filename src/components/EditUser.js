import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
    const { id } = useParams();  // Get user ID from URL
    const [user, setUser] = useState({ first_name: "", last_name: "", email: "", avatar: "" });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`)
            .then((response) => {
                setUser(response.data.data);
            })
            .catch(() => alert("User not found"));
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        alert(`Updated: ${user.first_name} ${user.last_name}`);
        navigate("/users");
    };

    return user.first_name ? (
        <div>
            <h2>Edit User</h2>
            <label>First Name:</label>
            <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />

            <label>Last Name:</label>
            <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />

            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} />

            <button onClick={handleSave}>Save Changes</button>
        </div>
    ) : <p>Loading user data...</p>;
};

export default EditUser;

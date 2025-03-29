import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Users.css"; // Import the CSS file

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://reqres.in/api/users");
                setUsers(response.data.data);
            } catch (err) {
                setError("Failed to fetch users. Please try again later.");
                console.error("Error fetching users:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return <div className="loading">Loading users...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="users-container">
            <header className="users-header">
                <h2 className="users-title">User Management</h2>
                <div className="users-actions">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="users-grid">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-avatar-container">
                                <img
                                    src={user.avatar}
                                    alt={`${user.first_name} ${user.last_name}`}
                                    className="user-avatar"
                                />
                            </div>
                            <div className="user-info">
                                <h3 className="user-name">
                                    {user.first_name} {user.last_name}
                                </h3>
                                <p className="user-email">{user.email}</p>
                            </div>
                            <div className="user-actions">
                                <button
                                    onClick={() => navigate(`/edit/${user.id}`)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
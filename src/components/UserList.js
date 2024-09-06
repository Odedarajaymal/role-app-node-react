// src/components/UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils"; // Assuming you have a global error handler

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  let hasAccess = localStorage.getItem("role") === "Admin";  // Check if the user is an admin
  //  for testing
  hasAccess = true
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users"); // API to get all users
      setUsers(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`); // API to delete user
      fetchUsers(); // Refresh users after deleting
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddUser = () => {
    navigate("/add-user"); // Redirect to a form for adding a new user
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      {hasAccess && (
        <button className="btn btn-primary mb-3" onClick={handleAddUser}>
          Add User
        </button>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              <td>{user.roleDetails?.roleName}</td>
              <td>
                {hasAccess ? (
                  <>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/edit-user/${user._id}`)}
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <span>No Access</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/roles"); // Correct API endpoint for roles
        setRoles(res.data); // Adjust response data based on API
      } catch (error) {
        console.error("Error fetching roles:", error);
        alert("Failed to fetch roles.");
      }
    };

    fetchRoles();
  }, []);

  const deleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${id}`); // API to delete role
      // Refresh roles after deleting
      setRoles(roles.filter(role => role._id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
      alert("Failed to delete role.");
    }
  };

  return (
    <div className="container">
      <h2>Role Management</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td>{role._id}</td>
              <td>{role.roleName}</td>
              <td>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => navigate(`/edit-role/${role._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this role?")) {
                      deleteRole(role._id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;

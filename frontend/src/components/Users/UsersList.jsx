import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers(); // Refresh list after deletion
  };

  return (
    <div>
      <h1>Users List</h1>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}{" "}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}{" "}
            <Link to={`/users/edit/${user.id}`}>Edit</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

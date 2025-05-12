import React, { useState } from "react";
import "./UserInfo.css";
import { useContext } from "react";
import { userContext } from "./context/UserContext";

const UserInfo = () => {
  const user = useContext(userContext);
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@mail.com" },
    { id: 2, name: "Bob", email: "bob@mail.com" },
    { id: 3, name: "Charlie", email: "charlie@mail.com" },
  ]);

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>User Information</h2>
      <ul>
        {users.map((user) => (
          //   <li key={user.id}>
          //   {user.name} - {user.email}
          <li key={user.id}>
            <p>{user.userDetails.username}</p>
            <p>{user.userDetails.email}</p>
            <button onClick={() => removeUser(username.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;

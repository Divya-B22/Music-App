import React, { createContext, useState } from "react";
const userContext = createContext();

const UserContext = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );

  const updateUserDetails = (data) => {
    setUserDetails(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <userContext.Provider value={{ userDetails, updateUserDetails }}>
      {children}
    </userContext.Provider>
  );
};

export { UserContext, userContext };

import React, { createContext, useEffect, useState } from "react";
const userContext = createContext();

const UserContext = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );

  const updateUserDetails = (data) => {
    setUserDetails(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  useEffect(() => {
    console.log("MUSICS");
    console.log(userDetails);
  }, [userDetails]);

  return (
    <userContext.Provider value={{ userDetails, updateUserDetails }}>
      {children}
    </userContext.Provider>
  );
};

export { UserContext, userContext };

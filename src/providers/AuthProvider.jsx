import React, { useEffect, useState } from "react";
import { AuthContext } from "../context";
import { getCookie } from "../lib/cookies";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);

  // useEffect hook to initialize authentication state from cookies on component mount
  useEffect(() => {
    // Retrieve user data from the "user" cookie, if available
    const cookieData = getCookie("user");

    if (cookieData) {
      setAuth(JSON.parse(cookieData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loginInfo, setLoginInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

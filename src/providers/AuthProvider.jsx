import React, { useState } from "react";
import { AuthContext } from "../context";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth, loginInfo, setLoginInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

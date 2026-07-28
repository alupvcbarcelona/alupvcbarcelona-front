import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/createContext";
import { useNavigate } from "react-router-dom";

const protectedRoute = ({ children, requiresAuth }) => {
  const {
    isAuth: { auth },
  } = useContext(StateContext);

  console.log(children, requiresAuth, auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (requiresAuth && !auth) {
      navigate("/");
    } else if (!requiresAuth && auth) {
      navigate("/presupuesto");
    }
  }, [auth, navigate, requiresAuth]);

  if ((requiresAuth && !auth) || (!requiresAuth && auth)) {
    return null;
  }

  return children;
};

export default protectedRoute;

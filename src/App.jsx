import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./views/Home/Home";
import Layout from "./layout/Layout";
import Login from "./views/Auth/Login/Login";
import NotFound from "./views/404/NotFound";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import Cookies from "./views/Cookies/Cookies";
import { Feedback } from "./views/Feedback/Feedback";
import Legal from "./views/LegalInformation/Legal";
import Quote from "./views/Quote/Quote";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={`/politicas-privacidad`} element={<PrivacyPolicy />} />
        <Route path={`/politicas-cookies`} element={<Cookies />} />
        <Route path={`/aviso-legal`} element={<Legal />} />
        <Route path={`/envia-resena`} element={<Feedback />} />
        <Route
          path={`/login`}
          element={
            <ProtectedRoute requiresAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/presupuesto`}
          element={
            <ProtectedRoute requiresAuth={true}>
              <Quote />
            </ProtectedRoute>
          }
        />

        {/** ERROR ROUTE */}
        <Route path={`*`} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

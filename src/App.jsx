import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./views/Home/Home";
import Layout from "./layout/Layout";
import Pack from "./views/Pack/Pack";
/* import Login from './views/Auth/Login/Login'
import Register from './views/Auth/Register/Register'
import Forgot from './views/Auth/Forgot/Forgot' */
import NotFound from "./views/404/NotFound";
/* import VerifyToken from './views/Auth/VerifyToken/VerifyToken'
import CreatePassword from './views/Auth/CreatePassword/CreatePassword'
import Dashboard from './views/Dashboard/Dashboard'
import Packs from './views/Packs/Packs'
import Bussiness from './views/Bussiness/Bussiness' */
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
/* import EthicsChannel from './views/EthicsChannel/EthicsChannel' */
import Cookies from "./views/Cookies/Cookies";
import { Feedback } from "./views/Feedback/Feedback";
import Legal from "./views/LegalInformation/Legal";
/* import Partners from './views/Partners/Partners'
import SoldPack from './views/SoldPacks/SoldPack'
import UserPacks from './views/UserPacks/UserPacks' */

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path={`/colaboradores`} element={<Partners />} />
        <Route path={`/colaborador/:user/:idPartner`} element={<Pack />} /> */}
        <Route path={`/politicas-privacidad`} element={<PrivacyPolicy />} />
        {/* <Route path={`/canal-etico`} element={<EthicsChannel />} /> */}
        <Route path={`/politicas-cookies`} element={<Cookies />} />
        <Route path={`/aviso-legal`} element={<Legal />} />
        <Route path={`/envia-resena`} element={<Feedback />} />
        {/* <Route path={`/login`} element={<ProtectedRoute requiresAuth={false}><Login /></ProtectedRoute> } />
        <Route path={`/registro`} element={<ProtectedRoute requiresAuth={false}><Register /></ProtectedRoute>} />
        <Route path={`/recuperar-password`} element={<ProtectedRoute requiresAuth={false}><Forgot /></ProtectedRoute>} />
        <Route path={`/verifica-codigo`} element={<ProtectedRoute requiresAuth={false}><VerifyToken /></ProtectedRoute>} />
        <Route path={`/nueva-contraseña`} element={<ProtectedRoute requiresAuth={false}><CreatePassword /></ProtectedRoute>} /> */}

        {/** PROTECTED ROUTE */}
        {/* <Route path={'/perfil'} element={<ProtectedRoute requiresAuth={true}><Dashboard /></ProtectedRoute>} />
        <Route path={'/packs'} element={<ProtectedRoute requiresAuth={true}><Packs /></ProtectedRoute>} />
        <Route path={'/negocio'} element={<ProtectedRoute requiresAuth={true}><Bussiness /></ProtectedRoute>} />
        <Route path={'/mis-packs-vendidos'} element={<ProtectedRoute requiresAuth={true}><SoldPack /></ProtectedRoute>} />
        <Route path={`/mis-packs-vendidos/:user/:idUser`} element={<ProtectedRoute requiresAuth={true}><UserPacks /></ProtectedRoute>} />
 */}

        {/** ERROR ROUTE */}
        <Route path={`*`} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

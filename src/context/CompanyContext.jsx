import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { COMPANY, SERVICES } from "../config/site";

const CompanyContext = createContext({ ...COMPANY, services: SERVICES });

// DATOS PÚBLICOS DE LA EMPRESA Y SERVICIOS (DEL PANEL, CON VALORES POR DEFECTO)
export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState({ ...COMPANY, services: SERVICES });

  useEffect(() => {
    api("/settings/public", { auth: false })
      .then(({ data }) => setCompany((prev) => ({ ...prev, ...Object.fromEntries(Object.entries(data).filter(([, v]) => v)) })))
      .catch(() => {});
    api("/services", { auth: false })
      .then(({ data }) => data?.length && setCompany((prev) => ({ ...prev, services: data })))
      .catch(() => {});
  }, []);

  return <CompanyContext.Provider value={company}>{children}</CompanyContext.Provider>;
};

export const useCompany = () => useContext(CompanyContext);
export const useServices = () => useContext(CompanyContext).services;

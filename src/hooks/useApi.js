import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

// ----------------------
// GET CON ESTADO: { data, error, loading, reload, setData }
// "loading" se deriva de la clave (ruta + versión), sin setState síncrono en el efecto
// ----------------------
export const useApi = (path, { auth = true, skip = false } = {}) => {
  const [version, setVersion] = useState(0);
  const [state, setState] = useState({ key: null, data: null, error: null });
  const key = `${path}#${version}`;

  useEffect(() => {
    if (!path || skip) return;
    const controller = new AbortController();
    api(path, { auth, signal: controller.signal })
      .then((data) => setState({ key, data, error: null }))
      .catch((error) => error.name !== "AbortError" && setState((s) => ({ key, data: s.data, error })));
    return () => controller.abort();
  }, [key, path, auth, skip]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  const setData = useCallback(
    (updater) => setState((s) => ({ ...s, data: typeof updater === "function" ? updater(s.data) : updater })),
    [],
  );

  const settled = state.key === key;
  return {
    data: state.data,
    error: settled ? state.error : null,
    loading: !skip && !settled,
    reload,
    setData,
  };
};

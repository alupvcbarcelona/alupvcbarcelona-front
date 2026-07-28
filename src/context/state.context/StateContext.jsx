import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReducerContext, StateContext } from "../createContext";
import { makeFetch } from "../../services/fetch";

export const StateProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState({
    home: null,
    pack: null,
    forgot: {
      verifyToken: null,
      email: null,
    },
  });
  const [partnersLoaded, setPartnersLoaded] = useState(false);
  const [isAuth, setIsAuth] = useState({
    existToken: localStorage.getItem("AUTH_VALIDATE_USER_TOKEN") || null,
    auth: Boolean(localStorage.getItem("AUTH_VALIDATE_USER_TOKEN")),
  });
  const [showMenu, setShowMenu] = useState(false);
  const { dispatchLoad, dispatchAuth, dispatchPartner, dispatchPack } =
    useContext(ReducerContext);

  const updateAuthToken = (save, token) => {
    if (save) {
      localStorage.setItem("AUTH_VALIDATE_USER_TOKEN", token);
      setIsAuth({
        existToken: token,
        auth: true,
      });
    } else {
      localStorage.removeItem("AUTH_VALIDATE_USER_TOKEN");
      setIsAuth({
        existToken: null,
        auth: false,
      });
    }
  };

  const URL_API = import.meta.env.VITE_URI_BACKEND;
  const [urlApi, setUrlApi] = useState({
    /*  URL_PARTNERS: `${URL_API}/user/get-partners`,
    URL_PACK: `${URL_API}/user/packs`, */
    URL_LOGIN: `${URL_API}/user/login`,
    /*  URL_REGISTER: `${URL_API}/user/register`,
    URL_FORGOT: `${URL_API}/user/forgot-password`, */
    URL_VERIFY_TOKEN: `${URL_API}/user/comprove-token`,
    /* URL_CREATE_PASSWORD: `${URL_API}/user/create-password`, */
    URL_GET_PROFILE: `${URL_API}/user/profile`,
    /* URL_GET_MY_PACKS: `${URL_API}/use-pack/my-packs`,
    URL_GET_MY_PARTNER_PACKS: `${URL_API}/pack/get-packs`,
    URL_PACKS_BUSSINESS: `${URL_API}/pack/get-packs`,
    URL_USE_PACK_CUSTOMER: `${URL_API}/use-pack/use-pack`,
    URL_CREATE_PACK: `${URL_API}/pack/create-pack`,
    URL_ASSIGN_PACK: `${URL_API}/use-pack/add-pack`,
    URL_CHANGE_STATE_PACK: `${URL_API}/pack/state-pack`,
    URL_GET_MY_SOLD_PACKS: `${URL_API}/pack/get-my-use-packs`,
    URL_CHANGE_MY_ROLE: `${URL_API}/user/change-role` */
  });

  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message, {
        style: {
          background: "var(--p-bg-primary)",
          color: "var(--p-text-primary)",
        },
      });
    } else if (type === "error") {
      toast.error(message, {
        style: {
          background: "var(--p-bg-primary)",
          color: "var(--p-text-primary)",
        },
      });
    } else {
      toast.info(message, {
        style: {
          background: "var(--p-bg-primary)",
          color: "var(--p-text-primary)",
        },
      });
    }
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  /** GET PROFILE */
  useEffect(() => {
    const getProfile = async () => {
      dispatchLoad({ type: "LOAD_TRUE" });
      try {
        const { response, data } = await makeFetch({
          url: urlApi.URL_GET_PROFILE,
          token: isAuth.existToken,
        });
        if (response.status !== 200) {
          showToast("error", "Hubo un problema con la autenticación.");
          updateAuthToken(false);
          if (location.pathname !== "/") {
            setTimeout(() => {
              navigate("../");
            }, 1500);
          }
          setPartnersLoaded(false);
          return;
        }
        dispatchAuth({ type: "SET_USER", payload: data.user });
      } catch (error) {
        showToast("error", `Algo ha salido mal, refresque la página.`);
        updateAuthToken(false);
        return;
      } finally {
        dispatchLoad({ type: "LOAD_FALSE" });
      }
    };

    if (isAuth.auth) getProfile();
    return;
  }, []);

  const handleCloseSesion = () => {
    dispatchLoad({ type: "LOAD_TRUE" });
    dispatchAuth({ type: "SET_USER", payload: {} });
    dispatchPack({ type: "SET_PARTNER_PACKS", payload: [] });
    dispatchPack({ type: "SET_PACKS", payload: [] });
    updateAuthToken(false);
    setTimeout(() => {
      dispatchLoad({ type: "LOAD_FALSE" });
    }, 1000);
  };

  return (
    <StateContext.Provider
      value={{
        isAuth,
        content,
        setContent,
        partnersLoaded,
        setPartnersLoaded,
        urlApi,
        showToast,
        showMenu,
        handleShowMenu,
        updateAuthToken,
        handleCloseSesion,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-reducer";
import { useTranslation } from "react-i18next";

const AppContext = createContext();

const initialState = {
  language: localStorage.getItem("language") || "fa",
  theme: localStorage.getItem("theme") || "light",
  showSidebar: true,
};

const AppProvider = ({ children }) => {
  const [state, distaptch] = useReducer(appReducer, initialState);
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    distaptch({
      type: "CHANGE_LANGUAGE",
      payload: language,
    });
  };
  const changeTheme = (theme) => {
    distaptch({
      type: "CHANGE_THEME",
      payload: theme,
    });
  };

  const toggleSidebar = () => {
    distaptch({
      type: "TOGGLE_SIDEBAR",
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.dataset.direction = state.language === "fa" ? "rtl" : "ltr";
    document.body.dataset.sidebarPosition =
      state.language === "fa" ? "right" : "left";
  }, [state.language]);

  return (
    <AppContext.Provider
      value={{ ...state, changeLanguage, changeTheme, toggleSidebar }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };

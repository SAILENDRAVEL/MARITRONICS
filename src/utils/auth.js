export const login = () => {
  sessionStorage.setItem("isAuth", "true");
};

export const logout = () => {
  sessionStorage.clear();
};

export const isAuthenticated = () => {
  return sessionStorage.getItem("isAuth") === "true";
};

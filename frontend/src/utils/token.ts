export const getAuthToken = () => {
  const authToken = localStorage.getItem("auth_token");
  if (!authToken) return null;
  return authToken;
};

export const setToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

export const removeToken = () => {
  localStorage.removeItem("auth_token");
};

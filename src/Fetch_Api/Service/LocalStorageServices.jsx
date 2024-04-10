
const storeToken = (value) => {
  if (value) {
    // console.log("Store Token")
    const { access, refresh } = value;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  }
};

const getToken = () => {
  let access_token = localStorage.getItem("access_token");
  let refresh_token = localStorage.getItem("refresh_token");
  return { access_token, refresh_token };
};

const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const storeMode = (value) => {
  if (value !== null && value !== undefined) {
    localStorage.setItem("mode", value); // Store the value directly
  }
};

const getMode = () => {
  let mode = localStorage.getItem("mode");
  return mode; // Return the value directly, not as an object
};

export { storeToken, getToken, removeToken, storeMode, getMode };

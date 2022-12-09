export const getLocalStorage = () => {
  let item = localStorage.getItem("uid");
  if (item) {
    return JSON.parse(localStorage.getItem("uid"));
  } else {
    return "";
  }
};

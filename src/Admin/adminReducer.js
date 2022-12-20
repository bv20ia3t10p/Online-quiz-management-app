export const adminReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMIN_INFO": {
      return { ...state, ...action.payload };
    }
    default:
      return { ...state };
  }
};

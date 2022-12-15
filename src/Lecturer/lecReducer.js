export const lecReducer = (state, action) => {
  switch (action.type) {
    case "SET_LEC_INF": {
      return { ...state, ...action.payload };
    }
    default:
      return { ...state };
  }
};

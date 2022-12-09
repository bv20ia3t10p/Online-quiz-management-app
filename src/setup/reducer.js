import { checkPriv } from "./checkPriv";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        ...state,
        uid: action.payload,
        isLoggedIn: true,
        privilege: checkPriv(action.payload),
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;

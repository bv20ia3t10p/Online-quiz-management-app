export const studentReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_CLASS": {
      return { ...state, isSelectingClass: true };
    }
    case "SET_STUDENT_INF": {
      return { ...state, ...action.payload };
    }
    case "SET_CLASS_LIST": {
      return { ...state, classList: action.payload };
    }
    case "CLOSE_SELECT_CLASS": {
      return { ...state, isSelectingClass: false };
    }
    case "SET_CURRENT_CLASS": {
      return { ...state, currentClass: action.payload };
    }
    case "SET_TAKE_EXAM": {
      return { ...state, isTakingExam: action.payload };
    }
    case "SET_UIT": {
      return { ...state, uid: action.payload };
    }
    default:
      return { ...state };
  }
};

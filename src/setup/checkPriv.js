export const checkPriv = (uid) => {
  const identifierLetter = uid[0];
  switch (identifierLetter) {
    case "2":
      return "Student";
    case "8":
      return "Lecturer";
    default:
      return "Admin";
  }
};

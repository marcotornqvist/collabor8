export const validateEmail = (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // If email is not valid return true
  if (!email.match(emailRegex)) {
    return true;
  } else {
    return false;
  }
};

const Validations = (userData) => {
  const errors = {};
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/;
  const regexPassword = /^(?=.*\d).+$/;
  if (regexEmail.test(userData.email)) {
    errors.email = "No es un email valido";
  }
  if (!userData.email) {
    errors.email = "No es un email valido";
  }
  if (userData.email.length > 35) {
    errors.email = "No es un email valido";
  }

  if (!regexPassword.test(userData.password)) {
    errors.password = "La password debe contener por lo menos un numero";
  }
  if (!userData.password) {
    errors.password = "No es un password valido";
  }
  if (userData.password.length < 6 || userData.password.length > 10) {
    errors.password = "La password debe contener entre 6 y 10 caracteres";
  }
  return errors;
};
export default Validations;

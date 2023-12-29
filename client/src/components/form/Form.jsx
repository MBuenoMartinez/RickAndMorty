import { useEffect, useState } from "react";
import Validations from "./validations";
import styles from "./Form.module.css";
import image from "../../images/loginImage.png";
const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (userData.email !== "" || userData.password !== "") {
      setErrors(Validations(userData));
    }
  }, [userData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className={styles.conteiner}>
      <form onSubmit={handleSubmit}>
        <img src={image} alt="loginImage" className={styles.image} />

        <input
          className={styles.input}
          placeholder="example@examplemail.com"
          type="email"
          name="email"
          onChange={handleChange}
          value={userData.email}
        />
        {errors.email !== "" && <p className={styles.errors}>{errors.email}</p>}

        <input
          className={styles.input}
          placeholder="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={userData.password}
        />
        {errors.password !== "" && (
          <p className={styles.errors}>{errors.password}</p>
        )}
        <br />
        <br />
        <button
          className={styles.button}
          disabled={
            !userData.email ||
            !userData.password ||
            errors.email ||
            errors.password
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;

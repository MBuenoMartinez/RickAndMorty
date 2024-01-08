import { useEffect, useState } from "react";
import Validations from "./validations";
import styles from "./Form.module.css";

import { Link } from "react-router-dom";
const FormSingUp = ({ singUp }) => {
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
    singUp(userData);
  };

  return (
    <div className={styles.conteiner}>
      <form onSubmit={handleSubmit}>
        <h2>Create your account</h2>

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
        <div>
          <Link to={"/login"}>
            <h4>Sing In</h4>
          </Link>
        </div>
        <button
          className={styles.button}
          disabled={
            !userData.email ||
            !userData.password ||
            errors.email ||
            errors.password
          }
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default FormSingUp;

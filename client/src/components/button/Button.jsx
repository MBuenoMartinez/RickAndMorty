import { Link } from "react-router-dom";
import styles from "../button/Button.module.css";
const Button = ({ link, text, onClick }) => {
  return (
    <Link to={link}>
      <button className={styles.button} onClick={onClick}>
        {text}{" "}
      </button>
    </Link>
  );
};
export default Button;

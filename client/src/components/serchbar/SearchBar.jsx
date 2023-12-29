import { useState } from "react";
import styles from "../button/Button.module.css";
const SearchBar = ({ onSearch }) => {
  const [id, setId] = useState("");
  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <input
        className={styles.input}
        type="search"
        placeholder="id..."
        onChange={handleChange}
        value={id}
      />
      <button
        className={styles.button}
        onClick={() => {
          onSearch(id);
          setId("");
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default SearchBar;

import { useSelector, useDispatch } from "react-redux";
import Card from "../card/Card";
import { filterCards, orderCards } from "../../redux/actions/actions";
import { useState } from "react";
import styles from "../favorites/Favorites.module.css";
const Favorites = () => {
  const [aux, setAux] = useState(false);
  const myFavorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();
  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setAux(true);
  };
  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };
  return (
    <div>
      <div className={styles.select}>
        <select onChange={handleOrder} className={styles.buttonSelect}>
          <option value="Ascendente" className={styles.selectOption}>
            Ascendente
          </option>
          <option value="Descendente" className={styles.selectOption}>
            Descendente
          </option>
        </select>
        <select onChange={handleFilter} className={styles.buttonSelect}>
          <option value="AllCharacters" className={styles.selectOption}>
            All Characters
          </option>
          <option value="Male" className={styles.selectOption}>
            Male
          </option>
          <option value="Female" className={styles.selectOption}>
            Female
          </option>
          <option value="Genderless" className={styles.selectOption}>
            Genderless
          </option>
          <option value="unknown" className={styles.selectOption}>
            unknown
          </option>
        </select>
      </div>
      <div className={styles.favorites}>
        {myFavorites?.map(
          ({ id, name, status, species, gender, origin, image }) => {
            return (
              <Card
                key={id}
                id={id}
                name={name}
                status={status}
                species={species}
                gender={gender}
                origin={origin}
                image={image}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Favorites;

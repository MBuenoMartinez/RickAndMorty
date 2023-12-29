import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFav, removeFav } from "../../redux/actions/actions";
import styles from "../card/Card.module.css";
const Card = ({
  id,
  name,
  status,
  species,
  gender,
  origin,
  image,
  onClose,
}) => {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);
  const { pathname } = useLocation();
  const [isFav, setIsFav] = useState(false);
  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(id));
    } else {
      setIsFav(true);
      dispatch(addFav({ id, name, status, species, gender, origin, image }));
    }
  };
  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);
  return (
    <div className={styles.conteiner}>
      {pathname !== "/favorites" ? (
        <button
          className={styles.button}
          onClick={() => {
            onClose(id);
          }}
        >
          X
        </button>
      ) : (
        ""
      )}

      {isFav ? (
        <button onClick={handleFavorite} className={styles.buttonFav}>
          ❤️
        </button>
      ) : (
        <button onClick={handleFavorite} className={styles.buttonFav}>
          🤍
        </button>
      )}
      <Link to={`/detail/${id}`}>
        <h2 className={styles.name}>{name}</h2>
        <h3
          className={
            status === "Alive" ? styles.statusAlive : styles.statusDead
          }
        >
          {status}
        </h3>
        <img src={image} alt={name} className={styles.image} />
      </Link>
    </div>
  );
};
export default Card;

import Card from "../card/Card";
import styles from "../cards/Cards.module.css";
const Cards = ({ characters, onClose }) => {
  return (
    <div className={styles.cards}>
      {characters.map(
        ({ id, name, status, species, gender, origin, image }) => {
          return (
            <Card
              key={id}
              id={id}
              name={name}
              status={status}
              species={species}
              gender={gender}
              origin={origin.name}
              image={image}
              onClose={onClose}
            />
          );
        }
      )}
    </div>
  );
};
export default Cards;

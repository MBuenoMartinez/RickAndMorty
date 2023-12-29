import axios from "axios";
import { useParams } from "react-router-dom";
import React from "react";
import styles from "../detail/Detail.module.css";
const Detail = () => {
  const [character, setCharacter] = React.useState({});
  //const { id } = useParams();
  const params = useParams();

  React.useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${params?.id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [params?.id]);
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={character?.image}
        alt={character?.name}
      />

      <div className={styles.text}>
        <h2>Name: {character?.name}</h2>
        <h2>Status: {character?.status}</h2>
        <h2>Species: {character?.species}</h2>
        <h2>Gender: {character?.gender}</h2>
        <h2>Origin: {character?.origin?.name}</h2>
      </div>
    </div>
  );
};
export default Detail;

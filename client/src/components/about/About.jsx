import styles from "../about/About.module.css";
import image from "/src/images/martin.png";
const About = () => {
  return (
    <div className={styles.container}>
      <div>
        <img src={image} alt="creatorImage" className={styles.image} />
      </div>
      <div className={styles.text}>
        <h1>Creador</h1>
        <h2>Name: Martin Bueno</h2>
        <h2>Status: Alive</h2>
        <h2>Species: Human</h2>
        <h2>Origin: Earth</h2>
        <h2>Email: martin.bueno10@hotmail.com</h2>
      </div>
    </div>
  );
};
export default About;

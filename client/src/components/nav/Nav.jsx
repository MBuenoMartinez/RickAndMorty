import SearchBar from "../serchbar/SearchBar";
import Button from "../button/Button";
import styles from "../nav/Nav.module.css";
const Nav = ({ onSearch }) => {
  const idRandom = () => {
    return Math.floor(Math.random() * (826 - 0) + 0);
  };
  return (
    <nav className={styles.conteiner}>
      <Button link={"/about"} text={"About"} />
      <Button link={"/home"} text={"Home"} />
      <Button link={"/favorites"} text={"Favorites"} />
      <Button onClick={() => onSearch(idRandom())} text={"Random Character"} />
      <SearchBar onSearch={onSearch} />
      <Button link={"/login"} text={"Log Out"} />
    </nav>
  );
};
export default Nav;

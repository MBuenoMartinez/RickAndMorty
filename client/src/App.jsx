/*styls*/
import style from "./App.module.css";
/*components*/
import Cards from "./components/cards/Cards";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import Favorites from "./components/favorites/Favorites";
/*hooks*/
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
/*dependencies*/
import axios from "axios";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  document.title = "Rinck and Morty";

  const onSearch = async (id) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );
      if (!characters.some((character) => character.id == data.id)) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        alert("¡Este personaje ya esta en la lista!");
      }
    } catch (error) {
      alert("¡Este personaje no existe!");
      throw Error(error.message);
    }
  };
  const onClose = (id) => {
    const charactersFiltered = characters.filter((character) => {
      return character.id !== id;
    });
    setCharacters(charactersFiltered);
  };
  const login = async (userData) => {
    try {
      const URL = `http://localhost:3001/rickandmorty/login`;
      const { data } = await axios.post(URL, userData);

      console.log(data);
      setAccess(data[0]);
      access && navigate("/home");
    } catch (error) {
      throw Error(error.message);
    }
  };

  useEffect(() => {
    !access && navigate("/login");
  }, [access]);

  return (
    <div className={style.body}>
      {location.pathname !== "/login" ? <Nav onSearch={onSearch} /> : ""}

      <Routes>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Form login={login} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;

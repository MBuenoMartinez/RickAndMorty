/*styls*/
import style from "./App.module.css";
/*components*/
import Cards from "./components/cards/Cards";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import Favorites from "./components/favorites/Favorites";
import FormSingUp from "./components/form/FormSingUp";
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
      const { data } = await axios(`/character/${id}`);
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
      const urlLogin = `/login?email=${userData.email}&password=${userData.password}`;
      const response = await axios.get(urlLogin);

      const { data } = response;
      if (data.access) {
        setAccess(data.access);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return window.alert(
          "Este usuario no existe, crea uno clikendo en sing up"
        );
      }
      throw Error(error.message);
    }
  };

  const singUp = async (userData) => {
    try {
      const urlSingUp = `/singUp`;
      await axios.post(urlSingUp, userData);

      setAccess(true);
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
      {location.pathname !== "/login" && location.pathname !== "/singUp" && (
        <Nav onSearch={onSearch} />
      )}

      <Routes>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Form login={login} />} />
        <Route path="/singUp" element={<FormSingUp singUp={singUp} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;

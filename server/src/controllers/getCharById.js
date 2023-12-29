const URL_BASE = "https://rickandmortyapi.com/api/character";
const axios = require("axios");

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios(`${URL_BASE}/${id}`);
    const { name, status, species, origin, image, gender } = response.data;
    if (name) {
      const character = {
        id,
        name,
        status,
        species,
        origin,
        image,
        gender,
      };
      return res.status(200).json(character);
    }

    return res.status(404).send("Not fOUND");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  getCharById,
};

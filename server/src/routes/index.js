const { Router } = require("express");
const { getCharById } = require("../controllers/getCharById");
const postUser = require("../controllers/postUser");
const postFav = require("../controllers/postFav");
const deleteFav = require("../controllers/deleteFav");
const login = require("../controllers/login");

const router = Router();
router.get("/character/:id", getCharById);

// router.get("/login", login);
router.post("/login", postUser);
router.post("/favorites", postFav);
router.delete("/favorites/:id", deleteFav);

module.exports = router;

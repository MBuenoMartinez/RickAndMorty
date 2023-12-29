const { User } = require("../DB_connection");

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    // Verificar si email o password están ausentes
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const user = await User.findOne({
      where: { email },
    });

    // Verificar si el usuario no existe
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si la contraseña es incorrecta
    if (password !== user.password) {
      return res.status(403).json({ error: "Contraseña incorrecta" });
    }

    // Si todo es correcto, enviar respuesta de éxito
    return res.status(200).json({ access: true });
  } catch (error) {
    // Manejar errores de manera más informativa
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = login;

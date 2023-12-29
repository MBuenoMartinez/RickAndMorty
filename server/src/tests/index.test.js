const { server } = require("../app");
const session = require("supertest");
const request = session(server);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      const response = await request.get("/rickandmorty/character/1");
      expect(response.statusCode).toBe(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await request.get("/rickandmorty/character/10");
      const props = [
        "id",
        "name",
        "species",
        "gender",
        "status",
        "origin",
        "image",
      ];
      props.forEach((prop) => {
        expect(response.body).toHaveProperty(prop);
      });
    });

    it("Si hay un error responde con status: 500", async () => {
      const response = await request.get("/rickandmorty/character/900");
      expect(response.statusCode).toBe(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("Responde con un objeto con la prop acces en true si las credeniales son correctas", async () => {
      const response = await request.get(
        "/rickandmorty/login?email=pepe@hotmail.com&password=pedro87"
      );
      expect(response.body).toEqual({ access: true });
    });
    it("Responde con un objeto con la prop acces en false si las credeniales son incorrectas", async () => {
      const response = await request.get(
        "/rickandmorty/login?email=pepe@hotmail.com&password=pedro8787ll"
      );
      expect(response.body).toEqual({ access: false });
    });
  });
  describe("POST /rickandmorty/favorites", () => {
    it("Responde con un arreglo con los objetos enviados por body", async () => {
      const character = {
        id: 913,
        name: "Martin",
        status: "Alive",
        gender: "Male",
        species: "Human",
        origin: { name: "Earth" },
        image: "image.jpg",
      };

      const response = await request
        .post("/rickandmorty/favorites")
        .send(character);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toContainEqual(character);
    });
    it("Responde con un array con los objetos enviados previamente y los nuevos", async () => {
      const character = {
        id: 923,
        name: "Pedro",
        status: "Dead",
        gender: "Male",
        species: "Human",
        origin: { name: "Earth" },
        image: "image.jpg",
      };
      const response = await request
        .post("/rickandmorty/favorites")
        .send(character);
      expect(response.body.length).toBe(2);
    });
  });

  describe("DELETE /rickandmorty/favorites/:id", () => {
    it("Responde con un arreglo con los objetos sin modificar si el id enviado no se encuentra como favorites", async () => {
      const response = await request.delete("/rickandmorty/favorites/9000");
      expect(response.body.length).toBe(2);
    });
    it("Responde con un arreglo con los objetos excepto con aquel cuyo id fue solicitado eliminar", async () => {
      const response = await request.delete("/rickandmorty/favorites/923");
      expect(response.body.length).toBe(1);
    });
  });
});

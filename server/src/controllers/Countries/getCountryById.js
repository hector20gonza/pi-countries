const getCountrybyIdhandlers = require("../../Handlers/Countries/getCountyById");

async function getCountryId(req, res) {
  try {
    const { id } = req.params;
    const {email} = req.query;
   console.log(email);
    if (!id) {
      return res
        .status(400)
        .json({ error: "Se requiere un ID de país válido" });
    }

    const country = await getCountrybyIdhandlers(id,email);

    if (!country) {
      return res.status(404).json({
        error: `No se encontró ningún país con el ID ${id}`,
      });
    }

    return res.json(country);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = getCountryId;

const addActivihandlers = require('../../Handlers/Activities/addActivity')

const addActivity = async (req, res) => {
  const { name, difficulty, duration, season } = req.body;
  const { id, email } = req.query;
  console.log(name, difficulty, duration, season,id, email)
  try {
    if (!name || !difficulty || !duration || !season) {
      throw new Error("La actividad no pudo crearse debido a datos faltantes.");
    }

    const add_activity = await  addActivihandlers(name, difficulty, duration, season,id, email)
    res.status(201).send(add_activity);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al crear la Actividad: ${error.message}` });
  }
};

module.exports = addActivity;

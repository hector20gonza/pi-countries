const getActivitiesHandlers = require("../../Handlers/Activities/getActvities");

const getActi = async (req, res) => {
  try {
    const { difficulty, season } = req.query;
    console.log(difficulty, season)

    const activities = await getActivitiesHandlers(difficulty, season);

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      error: `ha ocurrido un error mientras obtiene las listas de actividades`,
    });
  }
};

module.exports = getActi;

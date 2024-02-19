const deleteActivihandlers = require('../../Handlers/Activities/DeleteActivity')
const deleteActivity = async (req, res) => {
    const {email } = req.query;
    const { countryId,activityId}=req.params;
    console.log(email, countryId,activityId);
     
    try {
      if (!countryId || !email || !activityId) {
        throw new Error("La actividad no pudo eliminarse debido a datos faltantes.");
      }
     await deleteActivihandlers(countryId, email, activityId);
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al eliminar la actividad.");
    }
  }
  
  module.exports = deleteActivity;
  
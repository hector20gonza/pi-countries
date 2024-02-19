const patchActivityHandler = require('../../Handlers/Activities/PatchActivity');

const patchActivity = async (req, res) => {
  const { email } = req.query;
  const { countryId,activityId}=req.params;
  const { updatedFields } = req.body; 
  try {
    if (!activityId || !email || !updatedFields || !countryId) {
      throw new Error('Faltan datos para actualizar la actividad.');
    }

    // Llamar al handler para actualizar la actividad con los campos actualizados
    const updatedActivity = await patchActivityHandler(activityId, email, updatedFields,countryId);

    // Retornar la actividad actualizada
    return res.status(200).json(updatedActivity);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al actualizar la actividad.');
  }
};

module.exports = patchActivity;

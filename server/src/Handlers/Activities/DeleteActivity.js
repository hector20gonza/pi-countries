const { User, Activity, Country } = require("../../db");

const deleteActivityHandler = async (countryId, email, activityId) => {
  try {
      // Buscar la actividad por su ID
      const activity = await Activity.findByPk(activityId);
      if (!activity) {
          throw new Error("La actividad no fue encontrada.");
      }
      
      // Buscar al usuario por su email
      const user = await User.findOne({ where: { email } });
      if (!user) {
          throw new Error("Usuario no encontrado.");
      }

      // Eliminar la relación entre la actividad y los países asociados
      await activity.removeCountries([countryId]);

      // Eliminar la relación entre el usuario y la actividad
      await user.removeActivity(activity);

      // Retornar un mensaje o el objeto eliminado si es necesario
      return "La actividad fue eliminada exitosamente.";
  } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar la actividad.");
  }
};

module.exports = deleteActivityHandler;
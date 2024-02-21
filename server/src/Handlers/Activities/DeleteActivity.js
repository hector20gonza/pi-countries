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

    // Verificar si la actividad está asociada al país específico
    const country = await Country.findByPk(countryId);
    const isAssociated = await activity.hasCountry(country);
    if (!isAssociated) {
      throw new Error("La actividad no está asociada al país especificado.");
    }

    // Eliminar la relación entre la actividad y el país específico
    await activity.removeCountry(country);

    // Retornar un mensaje o el objeto eliminado si es necesario
    return "La actividad fue eliminada exitosamente.";
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeValidationError") {
      throw new Error("Error de validación de Sequelize.");
    } else if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("Error de restricción de unicidad de Sequelize.");
    } else {
      throw new Error("Error al eliminar la actividad.");
    }
  }
};

module.exports = deleteActivityHandler;

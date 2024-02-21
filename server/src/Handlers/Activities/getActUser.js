
const { User, Activity, Country } = require("../../db");

const getActUserHandler = async (email) => {
  try {
    // Buscar al usuario por su email
    const user = await User.findOne({ where: { email }, include: Activity });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Obtener las actividades asociadas al usuario
    const userActivities = user.Activities;

    // Inicializar una lista para almacenar las actividades y los países asociados
    const activitiesWithCountries = [];

    // Iterar sobre las actividades para obtener los países asociados
    for (const activity of userActivities) {
      // Obtener los países asociados a la actividad
      const countries = await activity.getCountries({ attributes: ['name'] });

      // Si hay países asociados, agregar la actividad y los países a la lista
      if (countries.length > 0) {
        // Crear un objeto con la actividad y los países asociados
        const activityWithCountries = {
          activity: {
            id: activity.id,
            name: activity.name,
            difficulty: activity.difficulty,
            duration: activity.duration,
            season: activity.season
          },
          countries: countries.map(country => country.name)
        };

        // Agregar el objeto a la lista
        activitiesWithCountries.push(activityWithCountries);
      }
    }

    return activitiesWithCountries;
  } catch (error) {
    console.error('Error al obtener las actividades del usuario:', error);
    throw new Error('Error al obtener las actividades del usuario');
  }
};

module.exports = getActUserHandler;

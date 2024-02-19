const { User, Activity, Country } = require("../../db");

const patchActivityHandler = async (activityId, email, updatedFields, countryId) => {
    try {
        // Buscar la actividad original por su ID
        const originalActivity = await Activity.findByPk(activityId);
        if (!originalActivity) {
            throw new Error("La actividad no fue encontrada.");
        }

        // Crear una nueva actividad con los campos actualizados
        const updatedActivity = await Activity.create(updatedFields);

        // Buscar al usuario por su email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }

        // Asociar al usuario con la nueva actividad
        await user.addActivity(updatedActivity);

        // Asociar la nueva actividad con el país en el que se realiza la "actualización"
        const country = await Country.findByPk(countryId);
        if (!country) {
            throw new Error("País no encontrado.");
        }
        await updatedActivity.addCountry(country);

        // Eliminar la asociación de la actividad original con el país en el que se realiza la "actualización"
        await originalActivity.removeCountry(country);

        // Retornar la actividad actualizada
        return updatedActivity;
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar la actividad.");
    }
};

module.exports = patchActivityHandler;

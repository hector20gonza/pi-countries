const { Country, Activity, User } = require("../../db");

module.exports = async (id, email) => {
  try {
    const country = await Country.findOne({
      where: { id: id.toUpperCase() },
      include: [
        {
          model: Activity,
          attributes: ["id", "name", "difficulty", "season"],
          include: [
            {
              model: User,
              attributes: [],
              where: { email },
            },
          ],
          through: { attributes: [] },
        }
      
      ],
    });

    return country;
  } catch (error) {
    console.error("Error al obtener los detalles del país:", error);
    throw error;
  }
}

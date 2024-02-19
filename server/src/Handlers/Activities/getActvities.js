const { User, Activity, Country } = require("../../db");

module.exports= async(difficulty, season)=>{

    let filParams = {};
    if (difficulty) filParams.difficulty = difficulty;
    if (season) filParams.season = season;
  try{
    const activities = await Activity.findAll({
        where: filParams,
        include: [
          {
            model: Country,
            attributes: [
              "id",
              "name",
              "image",
              "region",
              "subregion",
              "capitalCity",
              "area",
              "population",
            ],
            through: {
              attributes: [],
            },
          },
          {
            model: User,
            attributes: ["id", "email"],
            through: {
              attributes: [],
            },
          },
        ],
      });
  
      return activities;


}catch(error){
    res
    .status(500)
    .json({
      error: `ha ocurrido un error mientras obtiene las listas de actividades`,
    });
}
}
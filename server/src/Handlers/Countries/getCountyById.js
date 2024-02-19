const { Country, Activity } = require("../../db");


module.exports= async(id)=>{

try{
    const country = await Country.findOne({
        where: { id: id.toUpperCase() },
        include: [
          {
            model: Activity,
            attributes: ["id", "name", "difficulty", "season"],
            through: {
              attributes: [],
            },
          },
        ],
      });
  
      
  
      return country;
}catch(error){
    res.status(500).send("Error interno del servidor");
}

}
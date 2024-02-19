const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Country, Activity } = require('../../db');


module.exports=async (name)=>{
   
    try {
        if (!name) {
          const countrys = await Country.findAll({ include: Activity});
         return countrys;
        } else {
           const Querycountry = await Country.findAll({
            where: {
              name: {
                [Op.iLike]: `%${name}%`
              },
            },
             include: Activity
          });
    
          if (!Querycountry[0]) {
            res.send(error);
    
           
          }
          return Querycountry;
        }
      } catch (error) {
        res.send(error);
      }

}


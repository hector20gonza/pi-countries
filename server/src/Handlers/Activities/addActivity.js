const { User, Activity, Country } = require("../../db");

module.exports= async(name, difficulty, duration, season,id, email)=>{
try {
     
    const newIdupper =  id.split(",").map((country) => country.toUpperCase());

    const add_activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Usuario no encontrado.");
      }
  
      await add_activity.addCountries(newIdupper);
      await user.addActivities([add_activity.id]);
  
     return add_activity;
    
} catch (error) {
  console.log(error)
}
   
 
}
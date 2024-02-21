 const getActUserhandler = require('../../Handlers/Activities/getActUser')

 const getActUser= async(req, res)=>{
   
try {
    const {email}= req.query;
    
   if(!email) throw new Error('Error al recibir el email')
   const activities = await  getActUserhandler(email);
   res.status(200).json(activities);
} catch (error) {
    res.status(500).json({
        error: `ha ocurrido un error mientras obtiene las listas de actividades`,
      });
}
 }
 module.exports=getActUser;
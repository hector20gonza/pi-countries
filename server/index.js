const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');

const startDB = require('./src/StartDB/startDB.js')
const PORT = 3001;

conn.sync({force:false}).then(() => {
server.listen(PORT, () => {
  startDB();
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))

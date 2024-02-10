const PORT = 3000;
const server = require("./src/app");
const { conn } = require("./src/db");

// server.listen(PORT, () => {
//    console.log('Server raised in port: ' + PORT);
// });

server.listen(PORT, async () => {
  try {
   await conn.sync({force:true})
    console.log("Server raised in port: " + PORT);
  } catch (error) {
   console.log(error.message);
  }
});


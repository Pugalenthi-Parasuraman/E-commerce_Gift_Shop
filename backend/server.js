const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const Database = require("./config/db");

dotenv.config({path:path.join(__dirname,"config/config.env")});

Database();

const server = app.listen(process.env.PORT,()=>{
  console.log(
    `Server Successfully Running to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
  
})
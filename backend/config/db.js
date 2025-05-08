const mongoose = require("mongoose");

const Database = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000, 
    })
    .then((con) => {
      console.log(`MongoDB is connected : ${con.connection.host} `);
    })
    .catch((err) => {
      console.log();
    });
    
};

module.exports = Database;

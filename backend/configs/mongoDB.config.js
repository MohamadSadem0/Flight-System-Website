const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.MONGODB_URI);

 mongoose.connection.on("connected", () => {
    console.log("Connected to mongoDB");
  });

 mongoose.connection.on("error", (err) => {
    console.log("MongoDB Error: ", err);
  });
};
module.exports = { connect };
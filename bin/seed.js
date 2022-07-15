require("dotenv/config");
const mongoose = require('mongoose');
const Board = require('../models/Board.model');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/basic-auth-two';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

boards = [{ board: "freeForAll" }, { board: "shareTank" }, { board: "fishTrades" }, { board: "brakish" }]

Board.create(boards)
  .then(boards => {
    console.log("created boards");
    mongoose.connection.close();
  }
  )
  .catch(err => console.log(`An error has occured ${err}`))
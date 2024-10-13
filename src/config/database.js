const mongoose = require("mongoose");

// It returns a promise.
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://roushan123patna:Ac9mDDs8hMzMFgaI@cluster0.qtq3p.mongodb.net/devTinder"
  );
};



module.exports = connectDb;

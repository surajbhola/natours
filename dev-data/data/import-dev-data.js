const fs = require("fs");
const Tour = require("./../../models/tourModal");
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  path: "./../../config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection succesful!!!");
});

//READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(
    "./tours.json",
    "utf-8"
  )
);
const reviews = JSON.parse(
  fs.readFileSync(
    "./reviews.json",
    "utf-8"
  )
);
const users = JSON.parse(
  fs.readFileSync(
    "./users.json",
    "utf-8"
  )
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, {validateBeforeSave  :false});
    await Review.create(reviews);
    console.log("Data succesfully loaded");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Reviews.deleteMany();
    console.log("data succesfully delete!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteAllData();
}

// console.log(process.argv);

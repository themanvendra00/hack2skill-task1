const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const Data1 = require("./models/data1.model");
const Data2 = require("./models/data2.model");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome Hack2Skill team!");
});

app.get("/fetch-data", (req, res) => {
  Data1.aggregate([
    {
      $lookup: {
        from: "data2",
        localField: "email",
        foreignField: "email",
        as: "joinedData",
      },
    },
    {
      $project: {
        team_name: { $arrayElemAt: ["$joinedData.team_name", 0] },
        full_name: 1,
        email: 1,
        number: 1,
        city: 1,
        url: 1,
      },
    },
  ])
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("Error occurred while connecting to db", error);
  }
  console.log(`App is running on port ${port}`);
});

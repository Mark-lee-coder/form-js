const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { format } = require("date-fns");

var app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.post("/write-to-csv", (req, res) => {
  const headers = "First Name, Last Name, Phone Number, Email, Company";
  const data =
    req.body.fname +
    "," +
    req.body.lname +
    "," +
    req.body.phoneNum +
    "," +
    req.body.email +
    "," +
    req.body.company;

  const currentDate = new Date();
  const formattedDate = format(currentDate, "ddMMyyyy");
  const filepath = "./client-data/" + formattedDate + ".csv";

  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFile(filepath, headers + "\n" + data, (err) => {
        if (err) {
          res.status(500).send("Error creating the file");
        } else {
          res.status(200).send("File created successfully");
        }
      });
    } else {
      fs.appendFile(filepath, "\n" + data, (err) => {
        if (err) {
          res.status(500).send("Error appending to file");
        } else {
          res.status(200).send("Data appended successfully");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log("Application running on port 3000");
});

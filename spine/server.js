const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const cors = require('cors');

const API_PORT = 2999;
const app = express();
const router = express.Router();

const dbRoute = 
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());


router.get("/Saved", (req, res, next) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/addData", (req, res, next ) => {
  let data = new Data();

  const { id, title, authors, description, image, linkData } = req.body;

  if ((!id && id !== 0) || !linkData) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    })
  }

  data.title = title;
  data.authors = authors;
  data.description = description;
  data.image = image;
  data.linkData = linkData;
  data.id = id;
  data.save(err => {
    if (err) throw err;
  });
  next();
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const mongoose = require("mongoose");
const Data = require("./models/data");
var cors = require("cors");
const app = express();

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/myExcelData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("ooo", req.file);
    const file = req.file;
    if (!file) {
      return res.status(400).send("Please upload a file");
    }

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data);

    await Data.insertMany(data);

    res.status(200).send("File uploaded successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/data", async (req, res) => {
  try {
    const data = await Data.aggregate([
      { $project: { Quantity: 1, Item_Total: 1 ,
        Order_No:1,Product_ID:1,Customer_ID:1,_id:0,Product_Description:1
      } },
      { $limit: 70 },
    ]);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/filterData", async (req, res) => {
  try {
  const order = req.query.orderNo
  let data;
  console.log("yy",order)
if(order){
  console.log(true)

     data = await Data.aggregate([
      { $project: { Quantity: 1, Item_Total: 1, Order_No: 1 } },
      {
        $match: {
          Order_No: +order,
        },
      },
      { $limit: 50 },
    ]);}
    else{
  console.log(false)

       data = await Data.aggregate([
        { $project: { Quantity: 1, Item_Total: 1, Order_No: 1 } },
        {
          $match: {
            Order_No: 540027,
          },
        },
        { $limit: 50 },
      ]);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get("/ordernumber", async (req, res) => {
  try {
    const data = await Data.distinct( "Order_No" )
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

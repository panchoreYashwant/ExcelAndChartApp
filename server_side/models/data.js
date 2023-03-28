const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  Order_No: {
    type: Number,
    required:true
  },
  Product_Description: {
    type: String,
    required:true,
  },
  Product_ID: {
    type: String,
    required:true
  },
  Quantity: {
    type: Number,
    required:true
  },
  Item_Total: {
    type: Number,
    required:true
  },
  Customer_ID: {
    type: String,
    required:true
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;

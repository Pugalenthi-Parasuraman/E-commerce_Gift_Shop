const Products = require("../data/products"); // Ensure this file exists and exports an array
const Product = require("../models/product"); // Ensure the Product model is properly defined
const dotenv = require("dotenv");
const Database = require("../config/db");

dotenv.config({ path: "../config/config.env" });
Database(); // Make sure this connects successfully

const seedProducts = async () => {
  try {
    console.log("Connecting to Database...");
    await Product.deleteMany({});
    console.log("All existing products deleted!");

    await Product.insertMany(Products);
    console.log("All products have been added successfully!");
  } catch (error) {
    console.error("Error seeding products:", error.message);
  } finally {
    process.exit(); // Ensure the process exits in both success and failure cases
  }
};

seedProducts();

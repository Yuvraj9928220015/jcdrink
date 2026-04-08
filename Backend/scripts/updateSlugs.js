const mongoose = require("mongoose");
const Product = require("../models/productModel");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ColdDrink";

const createSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

async function run() {
  await mongoose.connect(MONGO_URI);

  const products = await Product.find();

  for (let p of products) {
    if (!p.slug) {
      p.slug = createSlug(p.title);
      await p.save();
    }
  }

  console.log("✅ All slugs updated");
  process.exit();
}

run();
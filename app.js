require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose
  .connect(
    `mongodb+srv://edgardoavs:${process.env.MONGO_DB_PASS}@development.43pzfu6.mongodb.net/stock-app?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`);
    });
    console.log("Conexion exitosa a la DB");
  })
  .catch((err) => console.log(err));

const productSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

app.use(express.json());

app.post("/api/v1/products", async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  await newProduct.save();

  res.status(201).json({ ok: true });
});
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT;

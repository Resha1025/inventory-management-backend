require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory Management API is running",
  });
});

app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
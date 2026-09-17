const { db } = require("../db");
const { products } = require("../db/schema");

const getProducts = async (req, res) => {
  try {
    const result = await db.select().from(products);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, sku, category, quantity, price } = req.body;

    if (!name || !sku || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, SKU, and price are required",
      });
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        sku,
        category,
        quantity: quantity || 0,
        price,
      })
      .returning();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
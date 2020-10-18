import aysncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all product
// @route GET /api/product
// @access Public
const getProducts = aysncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch single prodict
// @route GET /api/product/:id
// @access Public
const getProductById = aysncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy s ản phẩm');
  }
});

// @desc Delete a product
// @route Delete /api/product/:id
// @access Private/Admin
const deleteProduct = aysncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'product removed' });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy s ản phẩm');
  }
});

export { getProductById, getProducts, deleteProduct };

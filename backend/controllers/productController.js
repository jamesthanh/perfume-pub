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
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc Create a product
// @route POST /api/product
// @access Private/Admin
const createProduct = aysncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sản phầm A',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Thương hiệu mẫu',
    category: 'Thương hiệu mẫu',
    countInStock: 0,
    numReviews: 0,
    description: 'Đây là sản phẩm A',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Create a product
// @route PUT /api/product/:id
// @access Private/Admin
const updateProduct = aysncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};

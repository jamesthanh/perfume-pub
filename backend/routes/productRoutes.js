import express from 'express';
import aysncHandler from 'express-async-handler';
const router = express.Router();

import Product from '../models/productModel.js';

// @desc Fetch all product
// @route GET /api/product
// @access Public
router.get(
  '/',
  aysncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Fetch single prodict
// @route GET /api/product/:id
// @access Public
router.get(
  '/:id',
  aysncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Không tìm thấy sản phẩm');
    }
  })
);

export default router;

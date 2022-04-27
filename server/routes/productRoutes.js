import express from "express";
import { getProducts, getProductById, createProductReview, getTopProducts } from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/top', getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview)
router.route("/:id").get(getProductById)
router.route('/').get(getProducts)

export default router

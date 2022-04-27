import Product from '../models/productModel.js'
import asyncHandler from "express-async-handler"

const getProducts = asyncHandler ( async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? { 
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
     } : {}
    
    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword }).limit(pageSize).skip((page - 1) * pageSize)

    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductById = asyncHandler ( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

    res.json(product)
})

const createProductReview = asyncHandler ( async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400)
            throw new Error('You have already reviewed this product')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews 

        await product.save()
        res.status(201).json({message: "Review Added"})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const getTopProducts = asyncHandler ( async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})

export {getProducts, getProductById, createProductReview, getTopProducts}
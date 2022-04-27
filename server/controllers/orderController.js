import Order from '../models/orderModel.js'
import asyncHandler from "express-async-handler"

const addOrderItems = asyncHandler ( async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items.')
    } else {
        const order = new Order({
            orderItems,
            name: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            shippingPrice, 
            totalPrice
        })
    
        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
    
})

const getOrderById = asyncHandler ( async (req, res) => {
    const order = await Order.findById(req.params.id).populate('name', 'name email')
    
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('Order not found.')
    }
})

const updateOrderToPaid = asyncHandler ( async (req, res) => {
    const order = await Order.findById(req.params.id)
    
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.status(200).json(updatedOrder);
    } else {
        res.status(404)
        throw new Error('Order not found.')
    }
})

const getMyOrders = asyncHandler ( async (req, res) => {
    const orders = await Order.find({name: req.user._id})
    
    res.status(200).json(orders);
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }
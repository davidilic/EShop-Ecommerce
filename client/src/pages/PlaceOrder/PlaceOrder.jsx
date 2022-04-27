import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message' 
import CheckoutSteps from '../../components/CheckoutSteps' 
import { createOrder } from '../../redux/actions/orderActions.js'

const PlaceOrder = () => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)).toFixed(2)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10
    cart.totalPrice = Number(Number(cart.itemsPrice) + cart.shippingPrice).toFixed(2)

    const {order, success, error} = useSelector(state => state.orderCreate)
    const navigate = useNavigate()

    useEffect(() => {
        if(success) {
            dispatch({type: 'ORDER_CREATE_RESET'})
            navigate('/order/'+order._id)
        }
    },[navigate, order, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))
        dispatch({type: 'CART_RESET'})
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}
                            {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode}, {' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod ? cart.paymentMethod.paymentMethod : ''}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ?
                        <Message>Your cart is empty</Message> :

                        <ListGroup variant='flush'>
                            
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>

                                        <Col>
                                            <Link to={'/product/'+item.product}>
                                                {item.name}
                                            </Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.qty} x ${item.price.toFixed(2)} = ${(item.price * item.qty).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        }
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{cart.shippingPrice === 0 ? 'Free' : '$10'}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Button type='button' className='btn-block' 
                                disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                            </Row>     
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrder
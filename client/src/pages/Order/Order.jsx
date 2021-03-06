import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message' 
import Loader from '../../components/Loader' 
import { getOrderDetails, payOrder } from '../../redux/actions/orderActions.js'
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_DETAILS_RESET, ORDER_PAY_RESET } from '../../redux/constants/orderConstants'

const Order = () => {

    const dispatch = useDispatch()

    const [ sdkReady, setSdkReady ] = useState(false)

    const {order, loading, error} = useSelector(state => state.orderDetails)
    const {loading:loadingPay, success:successPay} = useSelector(state => state.orderPay)

    if(!loading){
        order.itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)
    }

    const orderId = useParams().id

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay){
            dispatch({type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        
    }, [dispatch, orderId, successPay, setSdkReady, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
    <h1>Order {order._id}</h1>
    <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p> <strong>Name: </strong> {order.name.name} </p>
                        <p><strong>Email: </strong> <a href={'mailto:' + order.name.email}>{order.name.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}
                            {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode}, {' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {order.paymentMethod ? order.paymentMethod : ''}
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ?
                        <Message>Order is empty</Message> :

                        <ListGroup variant='flush'>
                            
                            {order.orderItems.map((item, index) => (
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{order.shippingPrice === 0 ? 'Free' : '$10'}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                        </ListGroup.Item>
                            
                            )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
  </>

}

export default Order
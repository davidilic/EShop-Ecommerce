import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getUserDetails, updateUserProfile } from '../../redux/actions/userActions.js' 
import { listMyOrders } from '../../redux/actions/orderActions.js'

const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const { loading, error, user } = useSelector(state => state.userDetails)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success } = useSelector(state => state.userUpdateProfile)
    const { loading:loadingOrders, error:errorOrders, orders } = useSelector(state => state.orderListMy)


    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        }
        else if(!user.name){
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [navigate, userInfo, dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }

        
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Success!</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group className='py-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder ='Enter name' value={name}
                    onChange={(e) => {setName(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group className='py-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='text' placeholder ='Enter email' value={email}
                    onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group className='py-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder ='Enter Password' value={password}
                    onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder ='Confirm Password' value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)}}></Form.Control>
                </Form.Group>

                <Button className='my-3' type='submit' variant='primary'>
                    Update
                </Button>    
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>

            {loadingOrders && <Loader/>}

            {errorOrders ? <Message variant='danger'>{errorOrders}</Message> : 
            
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10) }</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}} />}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}} />}</td>                        
                            <td>
                                <Button className='btn-sm' variant='light' onClick={() => navigate(`/order/${order._id}`)}>Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> }
            
        </Col>
    </Row>
  )
}

export default Profile
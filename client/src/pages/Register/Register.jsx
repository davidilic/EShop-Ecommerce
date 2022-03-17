import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { register } from '../../redux/actions/userActions.js' 
import FormContainer from '../../components/FormContainer' 

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const {loading, error, userInfo } = useSelector(state => state.userRegister)

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')
    
    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo && redirect){
            navigate(redirect)
        }

        if(userInfo){
            navigate('/')
        }

    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }

        
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}

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
                Sign In
            </Button>    
        </Form>

        <Row className='py-3'>
            <Col>
                Have an account? &nbsp;
                <Link to={redirect ? '/register?redirect='+redirect : '/register'}>
                    Submit
                </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default Register
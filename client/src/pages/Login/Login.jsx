import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {login} from '../../redux/actions/userActions.js' 
import FormContainer from '../../components/FormContainer' 

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const {loading, error, userInfo } = useSelector(state => state.userLogin)

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')
    
    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>

        {error && <Message variant='danger'>{error}</Message>}

        {loading && <Loader/>}

        <Form onSubmit={submitHandler}>
            <Form.Group className='py-3' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='text' placeholder ='Enter email' value={email}
                onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder ='Enter Password' value={password}
                onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
                Sign In
            </Button>    
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? &nbsp;
                <Link to={redirect ? '/register/redirect='+redirect : '/register'}>
                    Register
                </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default Login
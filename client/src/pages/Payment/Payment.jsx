import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer' 
import { savePaymentMethod } from '../../redux/actions/cartActions.js'
import CheckoutSteps from '../../components/CheckoutSteps' 

const Payment = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate()

    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(savePaymentMethod({paymentMethod}))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <h1>Payment Method</h1>

        <Form onSubmit={submitHandler}>
            
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
            

                <Col>
                    <Form.Check 
                    onChange={(e) => setPaymentMethod(e.target.value)} checked 
                    value='PayPal' name='paymentMethod' id='paypal' 
                    type='radio' label='PayPal or Credit Card'>
                    </Form.Check>

                    <Form.Check 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    value='Stripe' name='paymentMethod' id='stripe' 
                    type='radio' label='Stripe'>
                    </Form.Check>
                </Col>

            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default Payment
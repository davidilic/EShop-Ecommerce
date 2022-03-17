import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer' 

const Shipping = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        
    }

  return (
    <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='py-3' controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder ='Enter address' value={address}
                onChange={(e) => {setAddress(e.target.value)}} required></Form.Control>
            </Form.Group>

            <Form.Group className='py-3' controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder ='Enter city' value={city}
                onChange={(e) => {setCity(e.target.value)}} required></Form.Control>
            </Form.Group>

            <Form.Group className='py-3' controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' placeholder ='Enter postal code' value={postalCode}
                onChange={(e) => {setPostalCode(e.target.value)}} required></Form.Control>
            </Form.Group>

            <Form.Group className='py-3' controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder ='Enter country' value={country}
                onChange={(e) => {setCountry(e.target.value)}} required></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default Shipping
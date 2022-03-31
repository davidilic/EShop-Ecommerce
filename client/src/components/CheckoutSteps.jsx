import React from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {

    const navigate = useNavigate()

    const clickHandler = (e) => {

        const destination = e.target.getAttribute('value')

        switch(destination){
            case 'login':
                navigate('/login')
                break
            case 'shipping':
                navigate('/shipping')
                break
            case 'payment':
                navigate('/payment')
                break
            case 'placeorder':
                navigate('/placeorder')
                break
            default:
                break
        }
    }


  return (
     <Nav className="flex justify-content-center mb-4">
         <Nav.Item>
             {step1 ? (
                <Nav.Link onClick={clickHandler} value='login'> Sign In </Nav.Link>
             ) : (
                 <Nav.Link disabled> Sign In </Nav.Link>
             )}
         </Nav.Item>

         <Nav.Item>
             {step2 ? (
                <Nav.Link value='shipping' onClick={clickHandler} style={{ textDecoration: 'none' }}> Shipping </Nav.Link>
             ) : (
                 <Nav.Link disabled> Shipping </Nav.Link>
             )}
         </Nav.Item>

         <Nav.Item>
             {step3 ? (
                <Nav.Link value='payment' onClick={clickHandler} style={{ textDecoration: 'none' }}> Payment </Nav.Link>
             ) : (
                <Nav.Link disabled> Payment </Nav.Link>
             )}
         </Nav.Item>

         <Nav.Item>
             {step4 ? (
                     <Nav.Link value='placeorder' onClick={clickHandler} style={{ textDecoration: 'none' }}> Place Order </Nav.Link>
             ) : (
                 <Nav.Link disabled> Place Order </Nav.Link>
             )}
         </Nav.Item>
     </Nav>
  )
}

export default CheckoutSteps
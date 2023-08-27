import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate  } from 'react-router-dom';


function PaymentScreen({history}) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address){
        history.push('/shipping')
    }


    const submitHandler = (e) =>{
        e.preventDefault()
        // dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutStep step1 step2 step3/>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form as='legend'> Select Method</Form>
                <Col>
                    <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id = 'paypal'
                    name='paymentMethod'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}                  
                    >
               
                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'> 
                Submit
            </Button>

        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
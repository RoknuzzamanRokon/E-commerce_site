import React, { useState } from 'react'
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import { saveShippingAddress } from '../actions/cartActions'
import { useNavigate  } from 'react-router-dom';    

function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)



  return (
    <div>
        <CheckoutStep step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>

                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}
                            {' - '}
                            {cart.shippingAddress.postalCode}
                            {' , '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment</h2>

                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4}>
                something
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen
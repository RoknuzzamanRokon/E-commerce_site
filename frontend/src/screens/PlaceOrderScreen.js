import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import { saveShippingAddress } from '../actions/cartActions'
import { useNavigate  } from 'react-router-dom';    

function PlaceOrderScreen() {
  return (
    <div>
        <CheckoutStep step1 step2 step3 step4/>
    </div>
  )
}

export default PlaceOrderScreen
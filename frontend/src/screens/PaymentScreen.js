// import React, { useState } from 'react'
// import { Form, Button, Col } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import FormContainer from '../components/FormContainer'
// import CheckoutStep from '../components/CheckoutStep'
// import { savePaymentMethod } from '../actions/cartActions'
// import { useNavigate  } from 'react-router-dom';


// function PaymentScreen({history}) {

//     const cart = useSelector(state => state.cart)
//     const { shippingAddress } = cart

//     const dispatch = useDispatch()

//     const navigate = useNavigate();

//     const [paymentMethod, setPaymentMethod_paypal] = useState('PayPal')
//     const [paymentMethod, setPaymentMethod_bkash] = useState('Bkash')

//     if (!shippingAddress.address){
//         navigate('/shipping')
//     }


//     const submitHandler = (e) =>{
//         e.preventDefault()
//         dispatch(savePaymentMethod(paymentMethod))
//         navigate('/placeorder')

//     }
//   return (
//     <FormContainer>
//         <CheckoutStep step1 step2 step3/>

//         <Form onSubmit={submitHandler}>
//             <Form.Group>
//                 <Form as='legend'> Select Method</Form>
//                 <Col>
//                     <Form.Check
//                         type='radio'
//                         label='pay'
//                         id = 'paypal'
//                         name='paymentMethod'
//                         checked
//                         onChange={(e) => setPaymentMethod_paypal(e.target.value)}>
               
//                     </Form.Check>
//                 </Col>

//                 <Col>
//                     <Form.Check
//                         type='radio'
//                         label='PayPal or Credit Card'
//                         id = 'paypal_02'
//                         name='paymentMethod'
//                         checked
//                         onChange={(e) => setPaymentMethod_bkash(e.target.value)}>
               
//                     </Form.Check>
//                 </Col>

//                 {/* <Col>
//                     <Form.Check
//                         type='radio'
//                         label='PayPal or Credit Card'
//                         id = 'paypal_03'
//                         name='paymentMethod'
//                         checked
//                         onChange={(e) => setPaymentMethod(e.target.value)}>
               
//                     </Form.Check>
//                 </Col> */}
//             </Form.Group>

//             <Button type='submit' variant='primary'> 
//                 Submit
//             </Button>

//         </Form>
//     </FormContainer>
//   )
// }

// export default PaymentScreen


import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutStep from '../components/CheckoutStep';
import { savePaymentMethod } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';

function PaymentScreen({ history }) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState(''); // Initialize with default value

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal'
                            id='paypal'
                            name='paymentMethod'
                            value='PayPal'
                            checked={paymentMethod === 'PayPal'}
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Bkash'
                            id='bkash'
                            name='paymentMethod'
                            value='Bkash'
                            checked={paymentMethod === 'Bkash'}
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Submit
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;

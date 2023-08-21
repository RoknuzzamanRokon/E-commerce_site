import React, {useEffect} from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { useLocation, Link, useParams } from 'react-router-dom';


// function CartScreen ({match, Location, history}) {
//   const { id } = useParams();
//   const productID = id
//   // const qty = new URLSearchParams(location.search).get('qty'); 
//   const qty = Location.search
//   console.log('qty:', qty)

function CartScreen({ match }) {
  const { id } = useParams();
  const productID = id;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qty = searchParams.get('qty');

  // console.log('qty:', qty);

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  // console.log('cartItems:', cartItems)

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  },[dispatch,productID,qty])

  const removeFromCartHandler = (id) => {
    console.log('remove:', id)
  }


  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flash'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product} >
                  <Row >
                    <Col md={2}>
                      <Image src={item.image} alt='item.name' fluid rounded/>
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item.product}`}> {item.name} </Link>
                    </Col>

                    <Col md={2}>
                      ${item.price}
                    </Col>
                    
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, e.target.value))}  
                      >
                        {
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button 
                      type='button' 
                      variant='light'
                      onClick={removeFromCartHandler(item.product)}>

                        <i className='fas fa-trash'> </i>

                      </Button>
                    </Col>

                  </Row>
                </ListGroup.Item>
              ))}
           </ListGroup>
         )}
        </Col>

      <Col md={4}>
     </Col>
    </Row>
  )
}

export default CartScreen




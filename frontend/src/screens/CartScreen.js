import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useLocation, Link, useParams, useNavigate, userInfo} from 'react-router-dom';


function CartScreen({ match }) {
  const { id } = useParams();
  const productID = id;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qty = searchParams.get('qty');


  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  // console.log('cartItems:', cartItems)
  
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  },[dispatch,productID,qty]);

  
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);


  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItemsFromStorage.length > 0) {
      dispatch({ type: 'CART_ADD_ITEM_MULTIPLE', payload: cartItemsFromStorage });
    }
  }, [dispatch]);

  



  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // const checkoutHandler = () => {
  //   history.push('/login?redirect=shipping')

  // }

  const navigate = useNavigate();   
  const userInfo = useSelector(state => state.userLogin.userInfo);
  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login', { state: { redirect: '/shipping' } });
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup className="justify-content-center" variant='flash'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product} >
                  <Row>
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
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}  
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
                      onClick={()=>removeFromCartHandler(item.product)}>

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
        <Card>
          <ListGroup variant='flush'>

            <ListGroup.Item>
              <h2>subtotal ({cartItems.reduce((acc=0, item) => (acc + parseInt(item.qty)), 0  )}) items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item className="d-flex justify-content-center">
            <Button
              type='button'
              className='btn-btn btn-dark btn-sm rounded-1 my-2'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              >
                Proceed To Checkout

            </Button>
          </ListGroup.Item>
        </Card>
     </Col>
    </Row>
  )
}

export default CartScreen




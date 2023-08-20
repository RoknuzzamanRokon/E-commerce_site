import React, {useEffect} from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
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
  console.log('cartItems:', cartItems)

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  },[dispatch,productID,qty])



  return (
    <div>
        CartScreen
    </div>
  )
}

export default CartScreen




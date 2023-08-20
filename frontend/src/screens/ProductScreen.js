import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { listProductsDetails } from '../actions/productActions'


function ProductScreen({match}) {
  const [qty, setQty] = useState(1)
  

    // const { id } = useParams();
    // const productId = match.params.id;
    
    // const [product, setProduct] = useState([])


    // const dispatch = useDispatch()

    const { id } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;


    useEffect(() => {
      // async function fetchProduct(){
      //   const { data } = await axios.get(`/api/products/${id}`)
      //   setProduct(data)
      // }

      // fetchProduct()

      dispatch(listProductsDetails(id))

    },[dispatch, id] )


    return (
      <div> 
        <Link to='/' className='btn btn-dark btn-sm rounded-3 my-3' style={{ width: '200px' }}>Go Back</Link> 
        {
          loading ?
            <Loader />
            : error
              ? <Message variant={'danger'}> {error} </Message>
              :(
                 <Row>
                  <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                  </Col>

                  <Col md={3}>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h3>{product.name}</h3>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Rating value={product.rating} color={'#f8e825'}/>
                        {product.numReviews} Reviews
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Price: ${product.price}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Description: {product.description}
                      </ListGroup.Item>


                    </ListGroup>
                  </Col>
                  
                  <Col md={3}>
                    <Card>
                      <ListGroup variant='flush'>

                        <ListGroup.Item>
                          <Row>
                            <Col>Price:</Col>
                            <Col>
                              <strong>${product.price}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>


                        <ListGroup.Item>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>
                                Qty
                              </Col>

                              <Col xs='auto' className='my-1'>
                                <Form.Control
                                  as="select"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}  
                                >
                                  {
                                    [...Array(product.countInStock).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item className="d-flex justify-content-center">
                          <Button className='btn-btn btn-dark btn-sm rounded-1 my-3' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>         
                  </Col>
                </Row>
               )
        }       
      </div>
    )
}


export default ProductScreen;


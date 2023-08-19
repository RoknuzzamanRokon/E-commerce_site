import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
// import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { listProductsDetails } from '../actions/productActions'


function ProductScreen({match}) {
  // const productId = match.params.id;
  
  // const [product, setProduct] = useState([])

  // const { id } = useParams();


  useEffect(() => {
    // async function fetchProduct(){
    //   const { data } = await axios.get(`/api/products/${id}`)
    //   setProduct(data)
    // }

    // fetchProduct()

  },[] )

  let product = {}

  return (
    <div> 
      <Link to='/' className='btn btn-dark btn-sm rounded-3 my-3' style={{ width: '200px' }}>Go Back</Link>
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

              <ListGroup.Item className="d-flex justify-content-center">
                <Button className='btn-btn btn-dark btn-sm rounded-1 my-3' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>         
        </Col>
      </Row>
    </div>
  )
}


export default ProductScreen;


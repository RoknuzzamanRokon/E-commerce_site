import React, {useState, useEffect} from 'react'
import { Link, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'  
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'



function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
      e.preventDefault()
      console.log('submit')
    };


  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>


          <Form.Group className='py-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group className='py-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Sign In
          </Button>

        </Form>

        <Row className='py-3'>
          <Col>
            New Customer? 
            <Link 
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>

              Register
            </Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
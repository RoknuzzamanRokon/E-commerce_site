import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'  
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'


function ProfileScreen({ history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      if ( !userInfo ) {
        history?.push('/login')
      }
      else{
        if (!user || !user.name){
            dispatch(getUserDetails('profile'))
        }    
        else{
            setName(user.name)
            setEmail(user.email)
        }
      }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
      e.preventDefault()

      if (password !== passwordConfirm) {
        setMessage('Passwords do not match')
    } else {
        console.log('updating....')
     }
    }


  return (
    <div>
        <Row>
            <Col md={3}>
                <h2>User profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'> {error}</Message>}
                {loading && <Loader/> }
                <Form onSubmit={submitHandler}>
                    <Form.Group className='py-3' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='py-3' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='py-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='py-3' controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>


            <Col md={9}>
                <h2>My Order</h2>
                 
            </Col>
        </Row>

    </div>
  )
}

export default ProfileScreen
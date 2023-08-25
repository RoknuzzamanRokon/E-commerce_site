import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions'


function Header() {
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const dispatch = useDispatch()

  const logoutHandler = () =>{
    dispatch(logout())
  }




  return (
    <header>
          <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
          <Container>
              <LinkContainer to='/'>
                <Navbar.Brand >RokoShop</Navbar.Brand>
              </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">

                <LinkContainer to='/cart'>
                <Nav.Link ><i className='fas fa-shopping-cart'>Cart</i></Nav.Link>
                </LinkContainer>


              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>
              ):(
                  <LinkContainer to='/login'>
                    <Nav.Link><i className="fas fa-user">login</i></Nav.Link>
                  </LinkContainer>
              )}

                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header
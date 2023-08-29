import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

function Footer() {
  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col className='text-center'>
        Copyright &copy; RokoShop
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
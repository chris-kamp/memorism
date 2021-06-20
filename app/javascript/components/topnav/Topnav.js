import React from 'react'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import { LinkContainer } from 'react-router-bootstrap'

const Topnav = () => {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <LinkContainer to="/decks"><Navbar.Brand>Memorism</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/decks"><Nav.Link>Home</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Topnav

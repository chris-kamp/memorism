import React, {useState, useEffect} from 'react'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { LinkContainer } from 'react-router-bootstrap'

const Topnav = ({user: userObj}) => {
  const [user, setUser] = useState("null");

  useEffect(() => {
    setUser(JSON.parse(userObj));
  }, userObj)

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <LinkContainer to="/decks"><Navbar.Brand>Memorism</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/decks"><Nav.Link>Home</Nav.Link></LinkContainer>
            <Nav.Link href="/users/sign_in">Log In</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>{user === null ? "" : user.username}</Navbar.Text>
            <Nav.Link href="/users/sign_out" data-method="delete">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Topnav

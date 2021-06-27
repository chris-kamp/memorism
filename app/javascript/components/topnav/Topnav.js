import React, {useState, useEffect} from 'react'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { LinkContainer } from 'react-router-bootstrap'

const Topnav = ({user: userObj}) => {
  // Initialise "user" state
  const [user, setUser] = useState(null);

  // Parse Rails user object from JSON
  useEffect(() => {
    setUser(JSON.parse(userObj));
  }, [userObj])

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" className="border-bottom border-dark">
        <LinkContainer to="/decks"><Navbar.Brand>Memorism</Navbar.Brand></LinkContainer>
        {/* Wraps elements which collapse into mobile dropdown menu */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left-aligned nav elements */}
          <Nav className="mr-auto">
            <LinkContainer to="/decks"><Nav.Link>Home</Nav.Link></LinkContainer>
            {!user && (<Nav.Link href="/users/sign_in">Log In</Nav.Link>)}
            {!user && (<Nav.Link href="/users/sign_up">Sign Up</Nav.Link>)}
          </Nav>
          {/* Right-aligned nav elements */}
          <Nav>
            {user && (<Nav.Link href="/users/sign_out" data-method="delete">Log Out</Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
        {/* Display user's username to right of nav, or in center of mobile dropdown */}
        {user && (<Navbar.Text className="m-auto">{user.username}</Navbar.Text>)}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar>
    </>
  )
}

export default Topnav

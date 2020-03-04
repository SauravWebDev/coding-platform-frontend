import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Logo from "../../../images.png";
import headerImage from "../../../input.png"

import "./Header.scss";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
function Header({ isLoggedIn }) {
  return (
<div>
    <Navbar  bg="dark" variant="dark">
     
       
        <Navbar.Brand href="/">
            <img className="logo" src={Logo} alt="website logo" />
            </Navbar.Brand>
     
            <Nav className="mr-auto">
            <Nav.Link href="content">Content</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        <div>
          {!isLoggedIn ? (
            <>
              <div>
                <NavLink to="/signup">Signup</NavLink>
              </div>
              <div>
                <NavLink to="/login">Login</NavLink>
              </div>
            </>
          ) : (
            <div className="accoutDiv">
              <AccountCircleIcon className="header-element" />
              <div className="dropdown-content">
                <NavLink to="/#">Profile</NavLink>
                <NavLink to="/#">Change Password</NavLink>
                <NavLink to="/#">Logout</NavLink>
              </div>
            </div>
          )}
        </div>

      </Navbar >
     <div>
      <Row className="removeMargin">
        <Col className="removePadding"><Jumbotron>
        <h1>CoderMan</h1>
        <p>
        The ultimate resource to prepare for coding interviews. Everything you need, in one streamlined platform.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron></Col>
       <Col>
       <Media>
  <img
    className="mr-3"
    src={headerImage}
    alt="Generic placeholder"
  />

</Media>
       </Col>
      </Row>
      </div>
      </div>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userData.isAuthenticated
  };
}
export default connect(mapStateToProps)(Header);

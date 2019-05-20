import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import logo from '../logo.png';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Logout from './Logout';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong className="text-capitalize">{ user ? `Welcome ${user.name}` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-4">
                    <Container>
                        
                            <NavbarBrand>
                                <Link to="/" className="remove-text-decoration">
                                    <img src={logo} width="50" height="50" alt="movie theater"/>
                                    Movie Theater
                                </Link>
                            </NavbarBrand>
                        
                        
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="https://github.com/zayedkz">Github</NavLink>
                                    </NavItem>
                                    { isAuthenticated ? authLinks : guestLinks }
                                </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
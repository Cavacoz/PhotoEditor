import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavbarBrand, NavItem, Button } from "reactstrap";

const Header = ({auth, setAuth}) => {

    const navigate = useNavigate();

    function handleLoginClick() {
        navigate("/login")
    }
    function handleSignupClick() {
        navigate("/signup")
    }

    function handleLogoutClick() {
        setAuth([]);
        localStorage.removeItem('token');
        localStorage.removeItem('creds');
        navigate("/")
    }

    return (
        <Navbar className="header" container="md" expand>
            <NavbarBrand className="mr-auto" href="/">
                Photo Editor
            </NavbarBrand>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink className="nav-link" to="/photoeditor">
                        Editor
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/mycollection">
                        My Collection
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav navbar className="navbar-gap">
                {!auth?.isAuthenticated ?
                    <>
                        <NavItem>
                            <Button onClick={handleLoginClick} outline>
                                Login
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={handleSignupClick}>
                                Sign Up
                            </Button>
                        </NavItem>
                    </>
                    :
                    <NavItem>
                        Hello, {auth.firstname} {auth.lastname}!
                        <Button onClick={handleLogoutClick} outline>
                            Logout
                        </Button>
                    </NavItem>
                }
            </Nav>
        </Navbar>
    );
}

export default Header;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavbarBrand, NavItem, Button } from "reactstrap";

const Header = (props) => {

    const navigate = useNavigate();

    function handleLoginClick() {
        navigate("/login")
    }
    function handleSignupClick() {
        navigate("/signup")
    }

    function handleLogoutClick() {
        props.setAuth([]);
        localStorage.removeItem('token');
        localStorage.removeItem('creds');
        navigate("/home")
    }

    return (
        <Navbar className="header" container="md" expand>
            <NavbarBrand className="mr-auto" href="/home">
                Photo Editor
            </NavbarBrand>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink className="nav-link" to="/photoeditor">
                        Editor
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="#">
                        My Collection
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav navbar style={{ gap: 10 }}>
                {!props.auth.isAuthenticated ?
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
                    <>
                        <NavItem>
                            Hello, {props.auth.firstname} {props.auth.lastname}!
                            <Button onClick={handleLogoutClick} outline>
                                Logout
                            </Button>
                        </NavItem>
                    </>
                }
            </Nav>
        </Navbar>
    );
}

export default Header;
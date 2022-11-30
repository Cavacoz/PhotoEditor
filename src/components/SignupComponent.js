import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import { signUpUser } from "./ApiCalls";
import { useNavigate } from "react-router-dom";

const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Signup = (props) => {

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordv, setPasswordV] = useState("");

    function handleSubmitClick() {
        signUpUser({ firstname: firstname, lastname: lastname, email: email, password: password });
        //needs error handler
        navigate('/login');
    }

    return (
        <div className="container signup-container">
            <Form className="container signup-form">
                <FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <h1 className="col-5">Sign Up</h1>
                        </Col>
                    </FormGroup>
                    <hr />
                    <FormGroup row>
                        <Label for="FirstName" sm={3}>First Name</Label>
                        <Col sm={9}>
                            <Input
                                id="FirstName"
                                name="firstname"
                                placeholder="Your First Name"
                                type="text"
                                onChange={(e) => setFirstname(e.target.value)}
                                valid={firstname.length >= 3}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="LastName" sm={3}>Last Name</Label>
                        <Col sm={9}>
                            <Input
                                id="LastName"
                                name="lastname"
                                placeholder="Your Last Name"
                                type="text"
                                onChange={(e) => setLastname(e.target.value)}
                                valid={lastname.length >= 3}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Email" sm={3}>Email</Label>
                        <Col sm={9}>
                            <Input
                                id="Email"
                                name="email"
                                placeholder="Your Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                valid={validEmail(email)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Password" sm={3}>Password</Label>
                        <Col sm={9}>
                            <Input
                                id="Password"
                                name="password"
                                placeholder="Your Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                valid={password.length >= 6}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="PasswordV" sm={3}>V. Password</Label>
                        <Col sm={9}>
                            <Input
                                id="PasswordV"
                                name="passwordv"
                                placeholder="Please verify your password"
                                type="password"
                                onChange={(e) => setPasswordV(e.target.value)}
                                valid={password === passwordv ? true : false}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button block={true} onClick={handleSubmitClick}>Submit</Button>
                    </FormGroup>

                </FormGroup>
            </Form>
        </div>
    );
}

export default Signup;
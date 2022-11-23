import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


const Login = ({loginUser}) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLoginClick() {
        loginUser({ username: email, password: password });
        navigate('/home');
    }

    return (
        <div className="container" style={{ padding: 100 }}>
            <Form className="container login-form" style={{ padding: 20, width: 400 }}>
                <FormGroup row>
                    <Col sm={12}>
                        <h1 className="col-5">Login</h1>
                    </Col>
                </FormGroup>
                <hr />
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
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button block={true} onClick={handleLoginClick}>Login</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Login;
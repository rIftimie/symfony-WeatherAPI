import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NotificationContainer from "./components/NotificationContainer";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { createUser } from "./services/fetch";

function Register() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();
    const [notification, setNotification] = useState(null);

    function onSubmit(data) {
        createUser(data)
            .then((res) => {
                console.log(res.data);
                setNotification(res.data);
            })
            .catch((err) => {
                console.log("no", err);
            });
        // register in the datbase
        // generate token
    }

    return (
        <Container>
            <h2>Registration Form</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("name")}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        {...register("password")}
                    ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            {notification && (
                <NotificationContainer type="inform" message={notification} />
            )}
        </Container>
    );
}

export default Register;

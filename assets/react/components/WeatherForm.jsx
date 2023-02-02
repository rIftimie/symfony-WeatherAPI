import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { getData, validate } from "../services/fetch";

function WeatherForm({ setWeatherData, setNotification }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        defaultValues: {
            name: "username",
            city: "madrid",
            country: "spain",
            token: "token",
        },
    });
    function onSubmit(data) {
        // go to /api/validate -> if ok -> getData();
        validate(data.name, data.token)
            .then((res) => {
                setNotification(null);
                getData(data.city)
                    .then((res) => {
                        setWeatherData(res);
                    })
                    .catch((err) => {
                        setNotification(err.status + " " + err.statusText);
                        setWeatherData(null);
                    });
            })
            .catch((err) => {
                setNotification(err.status + " " + err.statusText);
            });
    }

    const data = {
        name: watch("name"),
        city: watch("city"),
        country: watch("country"),
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                    type="text"
                    {...register("name", {
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                    })}
                />
                {errors.name?.type === "required" && (
                    <p role="alert">Username is required</p>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Localidad</Form.Label>
                <Form.Control
                    type="text"
                    {...register("city", {
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                    })}
                />
                {(errors.city?.type === "required" && (
                    <p role="alert">City is required</p>
                )) ||
                    (errors.city?.type === "pattern" && (
                        <p role="alert">Only letters are allowed.</p>
                    ))}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Pais</Form.Label>
                <Form.Control
                    type="text"
                    {...register("country", {
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                    })}
                />
                {(errors.country?.type === "required" && (
                    <p role="alert">Country is required</p>
                )) ||
                    (errors.city?.type === "pattern" && (
                        <p role="alert">Only letters are allowed.</p>
                    ))}
            </Form.Group>
            {data.name && data.city && data.country && (
                <Form.Group className="mb-3">
                    <Form.Label>Token</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("token", {
                            required: true,
                        })}
                    />
                    {errors.token?.type === "required" && (
                        <p role="alert">First name is required</p>
                    )}
                </Form.Group>
            )}

            <Button variant="primary" type="submit">
                Buscar
            </Button>
        </Form>
    );
}

export default WeatherForm;

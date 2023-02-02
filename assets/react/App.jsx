import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import NotificationContainer from "./components/NotificationContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "../styles/app.css";

export default function () {
    const [weatherData, setWeatherData] = useState(null);
    const [notification, setNotification] = useState(null);

    return (
        <>
            <Container className="mt-5">
                <Row>
                    {notification && (
                        <NotificationContainer message={notification} />
                    )}
                    <Col>
                        <WeatherForm
                            setNotification={setNotification}
                            setWeatherData={setWeatherData}
                        />
                    </Col>
                    <Col>
                        <WeatherCard weatherData={weatherData} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

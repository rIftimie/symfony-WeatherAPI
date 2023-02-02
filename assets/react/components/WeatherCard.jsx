import React from "react";
import Card from "react-bootstrap/Card";

function WeatherCard({ weatherData }) {
    let renderData = null;
    if (weatherData) {
        renderData = (
            <>
                <Card.Body>
                    <Card.Header className="d-flex justify-content-around">
                        <img
                            className="img"
                            src={
                                "https://openweathermap.org/img/w/" +
                                weatherData.weather[0].icon +
                                ".png"
                            }
                        />
                        <section className="d-flex flex-column">
                            <div>{weatherData.weather[0].main}</div>
                            <div className="fs-2">{weatherData.main.temp}º</div>
                            <div>
                                {weatherData.name}, {weatherData.sys.country}
                            </div>
                        </section>
                    </Card.Header>

                    <section className="p-3">
                        <div className="d-flex justify-content-between">
                            <div>Wind:</div>
                            <div>{weatherData.wind.speed} m/s</div>{" "}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Humidity: </div>
                            <div>{weatherData.main.humidity}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Pressure: </div>
                            <div>{weatherData.main.pressure}</div>
                        </div>
                    </section>
                </Card.Body>
            </>
        );
    }

    return <Card className="mt-4">{renderData}</Card>;
}

export default WeatherCard;

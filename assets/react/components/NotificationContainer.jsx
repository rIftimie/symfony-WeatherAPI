import React from "react";

function NotificationContainer({ type, message }) {
    let render;
    if (type === "inform") {
        render = (
            <div role="inform">
                Token Generated: <b>{message}</b>
            </div>
        );
    } else {
        render = <div role="alert">Error: {message}</div>;
    }

    return <>{render}</>;
}

export default NotificationContainer;

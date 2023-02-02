export async function validate(user, token) {
    const url = `http://127.0.0.1:8000/api/validate`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({ user, token }),
    });
    if (!response.ok) {
        return Promise.reject(response);
    } else {
        return Promise.resolve(response);
    }
}

export async function getData(city) {
    const key = "1d618cbdd70b66746eb61ce26a1792c8";
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    const response = await fetch(apiURL);

    if (!response.ok) {
        return Promise.reject(response);
    } else {
        return await response.json();
    }
}

export async function createUser(data) {
    const url = `http://127.0.0.1:8000/user/register`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({ name: data.name, password: data.password }),
    });
    if (!response.ok) {
        return Promise.reject(response);
    } else {
        return Promise.resolve(await response.json());
    }
}

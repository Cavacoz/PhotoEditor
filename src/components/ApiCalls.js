import { baseUrl } from '../shared/baseUrl';

export const loginUser = (creds, setAuth) => {
    return fetch(baseUrl + 'users/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                setAuth(response.user);
                console.log(response.user);
                localStorage.setItem('token', response.token);
            }
        })
    // handle error
}

export const postImage = (imgUrl) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const img = {
        url: imgUrl
    }
    return fetch(baseUrl + 'mycollection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(img)
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                console.log(response);
            }
        })
    // handle error
}
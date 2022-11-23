import { baseUrl } from '../shared/baseUrl';

export const loginUser = (creds) => {
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
                localStorage.setItem('token', response.token);
                return response.user;
            }
        })
    // handle error
}

export const signUpUser = (regInfo) => {
    const newUser = {
        firstname: regInfo.firstname,
        lastname: regInfo.lastname,
        username: regInfo.email,
        password: regInfo.password
    }
    return fetch(baseUrl + 'users/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                alert('Successful Sign Up', response.status);
            }
        })
    // handle error
}

export const fetchImages = () => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'mycollection', {
        headers: {
            'Authorization': bearer
        }
    })
        .then(response => response.json())
        .then((response) => {
            console.log('apicall', response);
            return response;
        })
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
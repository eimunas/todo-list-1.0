import tokenStore from '../stores/tokenStore';

const URL = 'http://localhost:3000';

let token = "";
tokenStore.subscribe((value) => token = value);

async function request(endpointName, method, body, queryString) {
    const settings = {
        method: method,
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }

    if (method === "GET" || method === "DELETE") delete settings.body;

    return await fetch(`${URL}/${endpointName}?${queryString}`, settings);
}


export async function getReq(endpointName, queryString) {
    return request(endpointName, "GET", null, queryString);
}


export async function postReq(endpointName, body) {
    return request(endpointName, "POST", body, "");
}


export async function putReq(endpointName, body) {
    return request(endpointName, "PUT", body, "");
}


export async function deleteReq(endpointName) {
    return request(endpointName, "DELETE", null, "");
}
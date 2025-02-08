import { writable } from 'svelte/store';

const tokenStore = writable(localStorage.getItem('token') || null);
tokenStore.subscribe(token => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
});

export function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

export default tokenStore;
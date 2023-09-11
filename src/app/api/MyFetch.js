import { tauri } from "@tauri-apps/api";
export default async function MyFetch(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = localStorage.getItem('access_token');
    // const token = await tauri.app.invoke('plugin:storage|read', { key: 'access_token' });

    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
        defaultOptions.headers['mode'] = 'outer';
    }

    return fetch(url, { ...defaultOptions, ...options });
}

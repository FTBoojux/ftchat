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
    if (options.body instanceof FormData) {
        delete defaultOptions.headers['Content-Type']; // 删除Content-Type以让浏览器自动处理
    }
    

    return fetch(url, { ...defaultOptions, ...options });
}

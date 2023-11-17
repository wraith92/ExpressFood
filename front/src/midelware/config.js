// midelware/config.js
const token = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?.token;
}

export const addToken = () => {
    return { headers: { 'Authorization': `Bearer ${token()}` } };
}

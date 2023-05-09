import client from './index';

const setToken = (token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', new Date().getTime() + 15 * 60 * 1000);
};

const getToken = () => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');
    if (!token || !expiration) return null;

    const isExpired = new Date().getTime() > expiration;
    if (isExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return null;
    }

    return token;
};


const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

const refreshToken = async () => {
    const query = `
    mutation RefreshToken($refreshToken: String!) {
      refreshToken(input: $refreshToken) {
        token
      }
    }
  `;
    const variables = { input: getRefreshToken() };
    try {
        const response = await client.mutate({ query, variables });
        const { token } = response.data.refreshToken;
        setToken(token);
        return token;
    } catch (error) {
        console.error(error);
        return null;
    }
};



export { getToken, refreshToken };
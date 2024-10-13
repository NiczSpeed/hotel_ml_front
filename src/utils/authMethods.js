import { jwtDecode } from 'jwt-decode';

export function isAdmin() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles || [];
    return roles.includes('ADMIN');
  } catch (error) {
    console.error('Error while decoding token: ', error.message);
    return false;
  }
}
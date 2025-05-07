import axios from '../api/axios';

const login = async (email: string, password: string): Promise<{access_token:string, user: any}> => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data; // Asegúrate que el backend devuelva { token }
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await axios.post('/auth/register', userData);
  console.log(res);
  return res.data;
};

export default { login, register };

import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  const decode: { name: string, email: string, sub: string, picture: string } =
    jwt_decode(response.credential);

  const { name, email, sub, picture } = decode;

  const doc = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }

  addUser(doc);

  await axios.post(`${BASE_URL}/api/auth`, doc, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
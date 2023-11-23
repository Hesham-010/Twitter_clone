import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
config();

export function CreateToken(payload) {
  const token = sign(payload, process.env.SECRET_TOKEN);
  return token;
}

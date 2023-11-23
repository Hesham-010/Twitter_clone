import { UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

export const contextFounction = ({ req }) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    throw new UnauthorizedException();
  }
  try {
    const decoded = verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
  } catch {
    throw new UnauthorizedException();
  }
  return req.user.user;
};

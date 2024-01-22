import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY, STATUS_401 } from '../utils/constants';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

/* eslint-disable consistent-return */
export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization needed' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res
      .status(STATUS_401)
      .send({ message: 'Authorization needed' });
  }

  req.user = payload;
  next();
};

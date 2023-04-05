import { STATUS_401 } from '../utils/constants';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = STATUS_401;
  }
}

export default UnauthorizedError;

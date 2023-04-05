import { STATUS_400 } from '../utils/constants';

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = STATUS_400;
  }
}

export default BadRequestError;

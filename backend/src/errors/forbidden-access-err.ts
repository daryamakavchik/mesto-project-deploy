import { STATUS_403 } from '../utils/constants';

class ForbiddenAccessError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = STATUS_403;
  }
}

export default ForbiddenAccessError;

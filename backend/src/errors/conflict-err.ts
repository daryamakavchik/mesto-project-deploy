import { STATUS_409 } from '../utils/constants';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = STATUS_409;
  }
}

export default ConflictError;

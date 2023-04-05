import { STATUS_404 } from '../utils/constants';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = STATUS_404;
  }
}

export default NotFoundError;

export const STATUS_500 = 500;
export const STATUS_400 = 400;
export const STATUS_401 = 401;
export const STATUS_403 = 403;
export const STATUS_404 = 404;
export const STATUS_409 = 409;
export const STATUS_11000 = 11000;
export const { PORT = 3000, LINK = 'mongodb://localhost:27017/mestodb', SECRET_KEY = 'some-secret-key' } = process.env;
export const linkRegex = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
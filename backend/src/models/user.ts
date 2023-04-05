import mongoose, { Model, Document } from 'mongoose';
import { linkRegex } from '../utils/constants';
import UnauthorizedError from '../errors/unauthorized-err';

const bcrypt = require('bcrypt');
const isEmailValidator = require('validator').isEmail;

export interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(value: string) {
        return linkRegex.test(value);
      },
      message: 'Невалидный URL',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => isEmailValidator(v),
      message: 'Неправильный формат почты',
    },
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string, next) {
  return this.findOne({ email }).select('+password').then((user: any) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password).then((matched: any) => {
      if (!matched) {
        next(new UnauthorizedError('Передан неккоректный пароль'));
      }
      return user;
    });
  });
});

export default mongoose.model<IUser, UserModel>('User', userSchema);

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import Joi = require('joi');
import { celebrate } from 'celebrate';
import mongoose from 'mongoose';
import bodyParser = require('body-parser');
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import {
  PORT, LINK, STATUS_500, STATUS_404, linkRegex,
} from './utils/constants';
import { requestLogger, errorLogger } from './middlewares/logger';
import { createUser, login } from './controllers/users';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import auth from './middlewares/auth';

interface IError extends Error {
  statusCode?: number
}

const { errors } = require('celebrate');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegex),
  }),
});

const app = express();
const connectDb = async (): Promise<any> => {
  await mongoose.connect(LINK).then(
    () => {
      console.info('Connected to database');
    },
  );
};

connectDb().catch((error) => console.error(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use(cors({
  credentials: true,
  origin: [
    'https://mestoproject.students.nomoredomains.work',
    'http://localhost:8081'
  ]
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validateLogin, login);
app.post('/signup', validateSignUp, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.all('/*', (req, res) => res.status(STATUS_404).json({ message: 'Страница не существует' }));
app.use(errorLogger);
app.use(errors());
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = STATUS_500, message } = err;
  res
    .status(statusCode)
    .send({
      message:
      // statusCode === STATUS_500
      //   ? 'Произошла ошибка на сервере'
        // :
        message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

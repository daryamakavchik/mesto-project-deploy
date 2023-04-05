import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../types/index';
import BadRequestError from '../errors/bad-request-err';
import NotFoundError from '../errors/not-found-err';
import ForbiddenAccessError from '../errors/forbidden-access-err';
import { STATUS_500 } from '../utils/constants';
import Card from '../models/card';

export const getAllCards = (req: IRequest, res: Response): void => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(STATUS_500).send({ message: 'Произошла ошибка на сервере' }));
};

export const createCard = (req: IRequest, res: Response, next: NextFunction): void => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user?._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        next(new BadRequestError(' Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};

export const deleteCard = (req: IRequest, res: Response, next: NextFunction): void => {
  const owner = req.user!._id;
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw next(new NotFoundError('Передан несуществующий id карточки'));
    })
    .then((card) => {
      if (String(card.owner) === owner) {
        card.remove();
        res.send({ message: 'Карточка успешно удалена' });
      } else {
        throw next(new ForbiddenAccessError('Карточки других пользователей не могут быть удалены'));
      }
    })
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

export const likeCard = (req: IRequest, res: Response, next: NextFunction): void => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  )
    .orFail(() => {
      throw next(new NotFoundError('Передан несуществующий id карточки'));
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

export const dislikeCard = (req: IRequest, res: Response, next: NextFunction): void => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true },
  )
    .orFail(() => {
      throw next(new NotFoundError('Передан несуществующий id карточки'));
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

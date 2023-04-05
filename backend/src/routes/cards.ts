import { Router } from 'express';
import Joi from 'joi';
import { celebrate } from 'celebrate';
import validator from 'validator';
import {
  deleteCard,
  createCard,
  getAllCards,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get('/cards', getAllCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      throw new Error('URL validation err');
    }),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), dislikeCard);

export default router;

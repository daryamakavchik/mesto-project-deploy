"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikeCard = exports.likeCard = exports.deleteCard = exports.createCard = exports.getAllCards = void 0;
const bad_request_err_1 = __importDefault(require("../errors/bad-request-err"));
const not_found_err_1 = __importDefault(require("../errors/not-found-err"));
const forbidden_access_err_1 = __importDefault(require("../errors/forbidden-access-err"));
const constants_1 = require("../utils/constants");
const card_1 = __importDefault(require("../models/card"));
const getAllCards = (req, res) => {
    card_1.default.find({})
        .then((card) => res.send({ data: card }))
        .catch(() => res.status(constants_1.STATUS_500).send({ message: 'Произошла ошибка на сервере' }));
};
exports.getAllCards = getAllCards;
const createCard = (req, res, next) => {
    var _a;
    const { name, link } = req.body;
    card_1.default.create({ name, link, owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
        .then((card) => res.send({ data: card }))
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default(' Переданы некорректные данные при создании карточки'));
        }
        next(err);
    });
};
exports.createCard = createCard;
const deleteCard = (req, res, next) => {
    const owner = req.user._id;
    card_1.default.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
        throw next(new not_found_err_1.default('Передан несуществующий id карточки'));
    })
        .then((card) => {
        if (String(card.owner) === owner) {
            card.remove();
            res.send({ message: 'Карточка успешно удалена' });
        }
        else {
            throw next(new forbidden_access_err_1.default('Карточки других пользователей не могут быть удалены'));
        }
    })
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default('Переданы некорректные данные'));
        }
        next(err);
    });
};
exports.deleteCard = deleteCard;
const likeCard = (req, res, next) => {
    var _a;
    card_1.default.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id } }, { new: true })
        .orFail(() => {
        throw next(new not_found_err_1.default('Передан несуществующий id карточки'));
    })
        .then((card) => {
        res.send({ data: card });
    })
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default('Переданы некорректные данные'));
        }
        next(err);
    });
};
exports.likeCard = likeCard;
const dislikeCard = (req, res, next) => {
    var _a;
    card_1.default.findByIdAndUpdate(req.params.cardId, { $pull: { likes: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id } }, { new: true })
        .orFail(() => {
        throw next(new not_found_err_1.default('Передан несуществующий id карточки'));
    })
        .then((card) => {
        res.send({ data: card });
    })
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default('Переданы некорректные данные'));
        }
        next(err);
    });
};
exports.dislikeCard = dislikeCard;

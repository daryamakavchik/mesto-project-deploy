"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.updateUserAvatar = exports.updateUserInfo = exports.getUserInfo = exports.findUserById = exports.createUser = exports.getAllUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bad_request_err_1 = __importDefault(require("../errors/bad-request-err"));
const unauthorized_err_1 = __importDefault(require("../errors/unauthorized-err"));
const not_found_err_1 = __importDefault(require("../errors/not-found-err"));
const conflict_err_1 = __importDefault(require("../errors/conflict-err"));
const constants_1 = require("../utils/constants");
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require('bcrypt');
const getAllUsers = (req, res) => {
    user_1.default.find({})
        .then((user) => res.send({ data: user }))
        .catch(() => res.status(constants_1.STATUS_500).send({ message: 'Произошла ошибка на сервере' }));
};
exports.getAllUsers = getAllUsers;
const createUser = (req, res, next) => {
    const { name, about, avatar, email, password, } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => user_1.default.create({
        email, password: hash, name, about, avatar,
    }))
        .then((user) => res.send({ data: user }))
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default('Переданы некорректные данные при создании пользователя'));
        }
        if (err.name === 'ConflictError' || err.statusCode === constants_1.STATUS_11000) {
            throw next(new conflict_err_1.default('Пользователь с таким email уже существует'));
        }
        next(err);
    });
};
exports.createUser = createUser;
const findUserById = (req, res, next) => {
    user_1.default.findById(req.params.userId)
        .orFail(() => {
        throw next(new not_found_err_1.default('Пользователь по указанному id не найден'));
    })
        .then((user) => {
        res.send({ data: user });
    })
        .catch((err) => {
        if (err.kind === 'ObjectId') {
            next(new bad_request_err_1.default('Неверный формат id'));
        }
        else {
            next(err);
        }
    });
};
exports.findUserById = findUserById;
const getUserInfo = (req, res, next) => {
    user_1.default.findById(req.user._id)
        .orFail(() => {
        throw next(new not_found_err_1.default('Пользователь по указанному id не найден'));
    })
        .then((user) => res.send({ data: user }))
        .catch((err) => {
        if (err.kind === 'ObjectId') {
            next(new bad_request_err_1.default('Неверный формат id'));
        }
        next(err);
    });
};
exports.getUserInfo = getUserInfo;
const updateUserInfo = (req, res, next) => {
    var _a;
    const { name, about } = req.body;
    user_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { name, about }, {
        new: true,
        runValidators: true,
        upsert: false,
    })
        .orFail(() => {
        throw next(new not_found_err_1.default('Пользователь по указанному id не найден'));
    })
        .then((user) => {
        if (user !== null) {
            res.send({ data: user });
        }
    })
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default('Переданы некорректные данные при обновлении профиля'));
        }
        else {
            next(err);
        }
    });
};
exports.updateUserInfo = updateUserInfo;
const updateUserAvatar = (req, res, next) => {
    var _a;
    const { avatar } = req.body;
    user_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { avatar }, {
        new: true,
        runValidators: true,
        upsert: false,
    })
        .orFail(() => {
        throw next(new not_found_err_1.default('Пользователь по заданному id не найден'));
    })
        .then((user) => {
        if (user !== null) {
            res.send({ data: user });
        }
    })
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default('Переданы некорректные данные при обновлении аватара'));
        }
        else {
            next(err);
        }
    });
};
exports.updateUserAvatar = updateUserAvatar;
const login = (req, res, next) => {
    const { email, password } = req.body;
    return user_1.default.findUserByCredentials(email, password)
        .then((user) => {
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
        res.send({ token });
    })
        .catch((err) => {
        if (err.name === 'BadRequestError') {
            next(new bad_request_err_1.default('Оба поля должны быть заполнены'));
        }
        else {
            next(new unauthorized_err_1.default('Передан неккоректный email'));
        }
        next(err);
    });
};
exports.login = login;

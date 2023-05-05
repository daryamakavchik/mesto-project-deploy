"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
/* eslint-disable consistent-return */
exports.default = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res
            .status(401)
            .send({ message: 'Необходима авторизация' });
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, constants_1.SECRET_KEY);
    }
    catch (err) {
        return res
            .status(constants_1.STATUS_401)
            .send({ message: 'Необходима авторизация' });
    }
    req.user = payload;
    next();
};

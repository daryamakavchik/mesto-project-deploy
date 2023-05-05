"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const celebrate_1 = require("celebrate");
const constants_1 = require("../utils/constants");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/users', users_1.getAllUsers);
router.get('/users:Id', (0, celebrate_1.celebrate)({
    params: joi_1.default.object().keys({
        _id: joi_1.default.string().length(24).hex(),
    }),
}), users_1.findUserById);
router.get('/users/me', users_1.getUserInfo);
router.patch('/users/me', (0, celebrate_1.celebrate)({
    body: joi_1.default.object().keys({
        name: joi_1.default.string().min(2).max(30),
        about: joi_1.default.string().min(2).max(30),
    }),
}), users_1.updateUserInfo);
router.patch('/users/me/avatar', (0, celebrate_1.celebrate)({
    body: joi_1.default.object().keys({
        /* eslint-disable-next-line */
        avatar: joi_1.default.string().pattern(new RegExp(`${constants_1.linkRegex}`)),
    }),
}), users_1.updateUserAvatar);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const unauthorized_err_1 = __importDefault(require("../errors/unauthorized-err"));
const bcrypt = require('bcrypt');
const isEmailValidator = require('validator').isEmail;
const userSchema = new mongoose_1.default.Schema({
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
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => isEmailValidator(v),
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
userSchema.static('findUserByCredentials', function findUserByCredentials(email, password, next) {
    return this.findOne({ email }).select('+password').then((user) => {
        if (!user) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return bcrypt.compare(password, user.password).then((matched) => {
            if (!matched) {
                next(new unauthorized_err_1.default('Передан неккоректный пароль'));
            }
            return user;
        });
    });
});
exports.default = mongoose_1.default.model('User', userSchema);

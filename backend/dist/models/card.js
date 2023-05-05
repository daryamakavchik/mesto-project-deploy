"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const constants_1 = require("../utils/constants");
const cardSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    owner: {
        type: mongodb_1.ObjectId,
        required: true,
    },
    likes: {
        type: (Array),
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
cardSchema.path('link').validate((val) => {
    const urlRegex = constants_1.linkRegex;
    return urlRegex.test(val);
}, 'Некорректный URL.');
exports.default = mongoose_1.default.model('card', cardSchema);

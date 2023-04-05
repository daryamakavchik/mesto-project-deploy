"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const celebrate_1 = require("celebrate");
const validator_1 = __importDefault(require("validator"));
const cards_1 = require("../controllers/cards");
const router = (0, express_1.Router)();
router.get('/cards', cards_1.getAllCards);
router.post('/cards', (0, celebrate_1.celebrate)({
    body: joi_1.default.object().keys({
        name: joi_1.default.string().min(2).max(30),
        link: joi_1.default.string().custom((value) => {
            if (validator_1.default.isURL(value)) {
                return value;
            }
            throw new Error('URL validation err');
        }),
    }),
}), cards_1.createCard);
router.delete('/cards/:cardId', (0, celebrate_1.celebrate)({
    params: joi_1.default.object().keys({
        cardId: joi_1.default.string().length(24).hex(),
    }),
}), cards_1.deleteCard);
router.put('/cards/:cardId/likes', (0, celebrate_1.celebrate)({
    params: joi_1.default.object().keys({
        cardId: joi_1.default.string().length(24).hex(),
    }),
}), cards_1.likeCard);
router.delete('/cards/:cardId/likes', (0, celebrate_1.celebrate)({
    params: joi_1.default.object().keys({
        cardId: joi_1.default.string().length(24).hex(),
    }),
}), cards_1.dislikeCard);
exports.default = router;

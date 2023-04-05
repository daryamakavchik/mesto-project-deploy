"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = constants_1.STATUS_400;
    }
}
exports.default = BadRequestError;

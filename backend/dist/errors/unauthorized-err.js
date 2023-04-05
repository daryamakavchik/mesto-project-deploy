"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = constants_1.STATUS_401;
    }
}
exports.default = UnauthorizedError;

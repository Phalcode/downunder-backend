"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (error, request, response, next) => {
    const status = error.statusCode || 500;
    const message = error.message || "It's not you. It's us. We are having some problems.";
    response.status(status).send(message);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (request, response, next) => {
    const message = "Resource not found";
    response.status(404).send(message);
};
exports.notFoundHandler = notFoundHandler;

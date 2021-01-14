"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
var Errors;
(function (Errors) {
    Errors["ERR_MAX_PLAYERS"] = "The maximum amount of players has been reached.";
    Errors["ERR_SAME_USERNAME"] = "Somebody in this session is already using this username.";
    Errors["ERR_USERNAME_TOO_SHORT"] = "The username needs to be at least 3 characters long.";
    Errors["ERR_NOT_YOUR_TURN"] = "It is not your turn.";
})(Errors = exports.Errors || (exports.Errors = {}));

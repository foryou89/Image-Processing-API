"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleErrors = function (error, req, res) {
    var status = error.status || 500;
    var message = error.message || 'Server error.';
    res.status(status).json({ status: status, message: message });
};
exports.default = handleErrors;

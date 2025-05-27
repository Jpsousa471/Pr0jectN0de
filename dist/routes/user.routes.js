"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRepository_1 = require("../modules/user/repositories/UserRepository");
const login_1 = require("../middleware/login");
const userRoutes = (0, express_1.Router)();
const userRepository = new UserRepository_1.UserRepository();
userRoutes.post('/sign-up', (request, response) => {
    console.log(request);
    // console.log(response);
    userRepository.create(request, response);
});
userRoutes.post('/sign-in', (request, response) => {
    userRepository.login(request, response);
});
userRoutes.get('/get-users', login_1.login, (request, response) => {
    userRepository.GetUser(request, response);
});
exports.default = userRoutes;

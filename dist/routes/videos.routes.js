"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VideosRepository_1 = require("../modules/videos/repositories/VideosRepository");
const login_1 = require("../middleware/login");
const videosRoutes = (0, express_1.Router)();
const videoRepository = new VideosRepository_1.VideoRepository();
videosRoutes.post('/create-video', login_1.login, (request, response) => {
    videoRepository.create(request, response);
});
videosRoutes.get('/get-videos', login_1.login, (request, response) => {
    videoRepository.getVideos(request, response);
});
videosRoutes.get('/serach', (request, response) => {
    videoRepository.serachVideos(request, response);
});
exports.default = videosRoutes;

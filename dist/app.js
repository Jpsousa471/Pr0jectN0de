"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const videos_routes_1 = __importDefault(require("./routes/videos.routes"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-request-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
});
//middleware
exports.app.use('/user', user_routes_1.default);
exports.app.use('/videos', videos_routes_1.default);

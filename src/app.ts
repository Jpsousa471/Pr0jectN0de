import express from 'express';
import userRoutes from './routes/user.routes';
import videosRoutes from './routes/videos.routes';
import "dotenv/config";
import cors from "cors"

export const app = express();

app.use(cors());

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-request-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
});

//middleware

app.use( '/user', userRoutes);
app.use('/videos', videosRoutes);
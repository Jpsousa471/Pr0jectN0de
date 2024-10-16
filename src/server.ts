import express from 'express';
import userRoutes from './routes/user.routes';
import videosRoutes from './routes/videos.routes';
import { config } from 'dotenv';
import { json } from 'stream/consumers';

config();
const app = express();

const cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-request-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
});

app.use(cors());

//middleware

app.use('/user', userRoutes);
app.use('/videos', videosRoutes);


app.listen(4000, () => {
    console.log('servidor rodando')
});


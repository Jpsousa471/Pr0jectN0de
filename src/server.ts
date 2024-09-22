
import express from 'express';
import userRoutes from './routes/user';

const app = express();

app.use(express.json());


app.use(userRoutes)


app.listen(4000, () => {
    console.log('servidor rodando')
});


import express from 'express'
const app = express();

app.use(express.json());

app.get('/users', (request, response) => {
    response.json([{name: 'João', age:20},{name: 'Pedro', age:22}]);
})

app.post('/userdata', (request, response) => {
    console.log(request.body)
    response.status(200).json({sucess: true})
})


app.listen(4000);
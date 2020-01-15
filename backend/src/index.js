const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://omnistack:mGMxNQ7gU$D5@cluster0-il0ty.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());

//Metodos HTTP: GET, POST, PUT, DELETE

//Tipos de parametro

//Query Params: request.query (Filtros, ordenação, paginação)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não-relacional)


app.post('/users', (request, response) => {
    console.log(request.body);
    return response.json({nome: 'Larissa'});
});

app.listen(3333);
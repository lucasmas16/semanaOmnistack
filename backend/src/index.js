const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

//MongoDB (Não-relacional)
mongoose.connect('mongodb+srv://omnistack:mGMxNQ7gU$D5@cluster0-il0ty.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);
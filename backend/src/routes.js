const { Router } = require('express');
const axios = require('axios'); // usado para fazer chamada em uma api externa
const Dev = require('./models/Dev')

const routes = Router();

//Metodos HTTP: GET, POST, PUT, DELETE

//Tipos de parametro

//Query Params: request.query (Filtros, ordenação, paginação)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

routes.post('/devs', async(request, response) => {
    const {github_username, techs} = request.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    const {name = login, avatar_url, bio} = apiResponse.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
    });

    console.log(name, avatar_url, bio, github_username);

    return response.json(dev);
});


module.exports = routes;
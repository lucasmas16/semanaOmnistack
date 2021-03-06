const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

//Metodos HTTP: GET, POST, PUT, DELETE

//Tipos de parametro

//Query Params: request.query (Filtros, ordenação, paginação)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:_id', DevController.update);
routes.delete('/devs/:_id', DevController.destroy);
routes.get('/search', SearchController.index);

module.exports = routes;
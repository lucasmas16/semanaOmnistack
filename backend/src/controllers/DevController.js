const axios = require('axios'); // usado para fazer chamada em uma api externa
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, update, destroy

module.exports = {

    async index(resquest, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;
    
        let dev = await Dev.findOne({github_username});
        console.log(dev);
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio = login} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
            console.log(techsArray);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        return response.json(dev);
    }
};


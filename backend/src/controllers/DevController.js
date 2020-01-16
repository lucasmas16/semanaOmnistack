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
        console.log('Passei1');
        if(!dev){
            console.log(`https://api.github.com/users/${github_username}`);
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            console.log('RESPOSTA: '+apiResponse);
            const {name = login, avatar_url, bio = login} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
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
    },
    async update(request, response){
        const _id = request.params;
        const {name, techs, latitude, longitude, avatar_url, bio} = request.body;

        let updateDev = {};
        
        if(name) updateDev.name = name;
        if(techs) updateDev.techs = parseStringAsArray(techs);
        if(latitude && longitude) updateDev.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
        if(avatar_url) updateDev.avatar_url = avatar_url;
        if(bio) updateDev.bio = bio;

        await Dev.findOneAndUpdate(_id,{$set: updateDev});
        return response.json({message: "ok"});
    },
    async destroy(request, response){
        const _id = request.params;

        await Dev.findOneAndDelete(_id);
        return response.json({message: "ok"});
    }
};


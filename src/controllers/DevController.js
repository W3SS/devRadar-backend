const axios = require('axios');
const parseStringAsArray = require('../helpers/parseStringAsArray')
const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, longitude, latitude } = req.body;
        const dev = await Dev.findOne({ github_username })
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            // if (!name) { name = apiResponse.data.login } 
            // console.log(name, avatar_url, bio, github_username);
            const techArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            const dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techArray,
                location,
            })
            return res.json(dev);
        }
        
    },
    
    async update(params) {
        
    },

    async destroy(params) {
        
    }

}
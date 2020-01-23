const Dev = require('../models/Dev')
const parseStringAsArray = require('../helpers/parseStringAsArray')

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;
        const techsArray = parseStringAsArray();
        const devs = await Dev.find({
            techs: { 
                $in: techsArray
            },
            // testar range de 10 km
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: { longitude, latitude}
                    },
                    $maxDistance: 10000,
                }
            }
        });
        return res.json({ devs: [] })
    }
}
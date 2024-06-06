const axios = require("axios");

const getPlacesByText = async (req, res, next) => {
    const query = req.query.text;
    try {
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=${process.env.GEOAPIFY_APIKEY}`);
        const data = response.data
        res.status(200).json(data)
    } catch (e) {
        next({statusCode: 500, message: e.response.data.message})
    }
}

const getPlaceById = async (req, res, next) => {
    const id = req.query.id;
    try {
        const response = await axios.get(`https://api.geoapify.com/v2/place-details?id=${id}&format=json&apiKey=${process.env.GEOAPIFY_APIKEY}`);
        const data = response.data
        res.status(200).json(data)
    } catch (e) {
        next({statusCode: 500, message: e.response.data.message})
    }
}

module.exports = {
    getPlacesByText,
    getPlaceById,
}
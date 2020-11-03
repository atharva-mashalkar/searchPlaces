const axios = require('axios');
const Q = require('q');
const baseUrl  = require('../config/base_Url');
const ResponseUtils = require('./ResponseUtils');

const searchApi = () => {

    const api = async (searchString,location) => {

        const deferred = Q.defer();

        try {
            let res = await axios.get(
                `${baseUrl}&q=${searchString}`,
                {
                    headers: {
                         Geolocation:`geo:${location.lat},${location.long};cgen=gps`
                }
            })
            deferred.resolve(ResponseUtils.process200(res.data.results));
        }catch(err) {
            deferred.reject(ResponseUtils.process401(err.response.data,"API Key expired/not found","API KEY ERROR"))
        }
        return deferred.promise;
    }
    return{
        api
    }

};

module.exports = searchApi;
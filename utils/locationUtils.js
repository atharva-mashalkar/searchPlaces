const NodeGeocoder = require('node-geocoder');
const apiKey = require('../config/api_key');
const Q = require('q');
const ResponseUtils = require('./ResponseUtils');

const userLocation = () => {
    
    const options = {
        provider: 'here', 
        apiKey
    };

    const geocoder = NodeGeocoder(options);

    const getPlace = async (lat,lon) => {
        
        const deferred = Q.defer();

        try{
            const res = await geocoder.reverse({ lat, lon});
            if(res.length > 0){
                deferred.resolve(ResponseUtils.process200(res[0].city));  
            }else{
                deferred.reject(ResponseUtils.process404("Not found","City not found"))
            }
        }catch(err){
            console.log(err);
            deferred.reject(ResponseUtils.process401(err,"API Key expired/not found","API KEY ERROR"))
        }
        return deferred.promise

    }
    
    const getCoordinates = async (query) => {

        const deferred = Q.defer();
        try{
            let res = await geocoder.geocode(query)
            if(res.length == 0){
                deferred.reject(ResponseUtils.process404("Not found",`${query} not found`))
            }else{
                deferred.resolve(ResponseUtils.process200(res));
            }
        }catch(err){
            console.log(err);
            deferred.reject(ResponseUtils.process401(err,"API Key expired/not found","API KEY ERROR"))
        }
        return deferred.promise
    }
    return{
        getCoordinates,
        getPlace
    }
}

module.exports = userLocation
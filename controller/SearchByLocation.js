const readline = require('readline');
const searchApi = require('../utils/ApiUtils')();
const location = require('../utils/locationUtils')();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

//Getting results from location
const getUsingLocation = () => {
    var locationCoordinates = { lat: 0, long: 0 };
    rl.question('\nEnter Latitude of the location nearby to desired location\n', (ans) => {
        locationCoordinates['lat'] = ans;
        if (isNaN(parseFloat(ans)) || parseFloat(ans) > 90 || parseFloat(ans) < -90) {
            console.log("\n***********Please enter proper latitude***************");
            getUsingLocation();
        } else {
            rl.question('\nEnter Longitudes of the location nearby to desired location', async (ans) => {
                locationCoordinates['long'] = ans;
                if (isNaN(parseFloat(ans)) || parseFloat(ans) > 180 || parseFloat(ans) < -180) {
                    console.log("\n*************Please enter proper longitude*****************\n");
                    getUsingLocation();
                } else {
                    try {
                        place = await location.getPlace(locationCoordinates.lat, locationCoordinates.long);
                        result = await searchApi.api(place, locationCoordinates)
                        console.log(result);
                        console.log("Quick Guide for few properties of the data")
                        console.log({
                            'href': "Link of HERE to get most accurate results for that place.",
                            'distance': "distance from user's place or given coordinates",
                            'position': 'array of co-ordinates'
                        })
                    } catch (err) {
                        console.log(err);
                    }
                    rl.close();
                }
            })
        }
    })
}

module.exports = {
    getUsingLocation
};
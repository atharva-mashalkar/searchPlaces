const readline = require('readline');
const searchApi = require('../utils/ApiUtils')();
const location = require('../utils/locationUtils')();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

//Error count
errCount = 0;

//Getting user coordinates
let userCoordinates = 0;
const getUserLocation = () => {
    rl.question(
        "\nPlease enter your city/town/village name: ",
        async (ans) => {
            try {
                userCoordinates = await location.getCoordinates(ans);
                userCoordinates = {
                    lat: userCoordinates.data[0].latitude,
                    long: userCoordinates.data[0].longitude
                }
                errCount = 0;
                getUsingSearchString()
            } catch (err) {
                console.log(err);
                errCount = errCount + 1;
                if (errCount < 2) {
                    console.log("Lets try again!");
                    getUserLocation();
                } else {
                    rl.close();
                }
            }
        }
    )
}

//Getting results from string search
const getUsingSearchString = () => {
    rl.question(
        'Please enter a search string:\n',
        async (ans) => {
            let searchStr = ans.split(" ").join("+");
            try {
                result = await searchApi.api(searchStr, userCoordinates)
                if(result.data.length == 0){
                    console.log("No such place found!")
                }else{
                    console.log(result);
                    console.log("Quick Guide for few properties of the data")
                    console.log({
                        'href':"Link of HERE to get most accurate results for that place.",
                        'distance':"distance from user's place or given coordinates",
                        'position':'array of co-ordinates'
                    })
                }
            } catch (err) {
                console.log(err);
            }
            rl.close();
        });
}

module.exports = {
    getUserLocation
}
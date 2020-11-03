const readline = require('readline');
const SearchByString = require('./controller/SearchByString');
const SearchByLocation = require('./controller/SearchByLocation');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Declaring program exit code
rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? ', (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.pause();
    });
});

//Declaring search options 
const searchOptions = {
    methods: {
        one: "By providing Latitude and Longitude of location close to required location. (Accurate for distant locations)",
        two: "By providing a search string. (Accurate of closeby locations)"
    }
}

//Selecting search methods
const getMethod = () => {
    rl.question(
        `What is your peferred way of searching?\n1. ${searchOptions.methods.one}\n2. ${searchOptions.methods.two}\n`,
        (ans) => {
            errCount = 0;
            if (ans == 2) {
                SearchByString.getUserLocation();
            } else {
                SearchByLocation.getUsingLocation();
            }
        });
}

//Lets Begin!!
getMethod();

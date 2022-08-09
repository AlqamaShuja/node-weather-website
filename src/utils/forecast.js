const request = require("request");

const forecast = (lattitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2acc0453a67699a9d6e2bc88aa97c759/${lattitude},${longitude}?units=si`;
    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect weather service.", undefined);
        }
        else if (body.error) {
            callback("Sorry, we are unable to find Weather.", undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    });
}


module.exports = forecast;
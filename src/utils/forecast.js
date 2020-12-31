const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c4486c7cb09a78352135f6d47da541f6&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("You don't have acesses to internet", undefined);
    } else if (body.error) {
      callback("Can't find the given location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degree out. " +
          "It feel like " +
          body.current.feelslike +
          " degree out"
      );
    }
  });
};
module.exports = forecast;

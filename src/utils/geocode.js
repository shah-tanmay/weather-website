const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(address) +
    ".json?access_token=pk.eyJ1IjoidGFubWF5LXNoYWgiLCJhIjoiY2tqM3didWt3MGY1bTJybzk0dHVzbHU3OCJ9.tkf9N3iGnZWvjuOwqu1JKA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("You are not connected to internet!", undefined);
    } else if (body.features.length === 0) {
      callback("Please enter a valid location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1d29820e28a019ac6fb6639ff4674c55&query=${lat},${long}`;
  request({ url, json: true }, (error, response = {}) => {
    const { body } = response;
    const { body: { current } = {} } = response;
    // const { current } = body;

    if (error) {
      callback("Unable to connect to forecast services!", undefined);
    } else if (body.error) {
      console.log(response.body);
      callback("Invalid coordinates detected", undefined);
    } else {
      let modifiedTime = current.observation_time.split(":");
      modifiedTime[0] = +modifiedTime[0] + 1;
      console.log(modifiedTime);
      const newTime = modifiedTime.join(":");
      console.log(newTime);
      // console.log(y);
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out, it feels like ${current.feelslike} degrees out. Observation time is ${newTime} West African Time`
      );
    }
  });
};

module.exports = {
  forecast,
}; //Note that this fxn can only be accessed as an object method in app.js

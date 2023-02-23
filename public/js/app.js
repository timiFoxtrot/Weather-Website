const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevents the page from refreshing which is a default form behaviour
  const location = input.value;
  console.log(location);

  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
        console.log(data);
      } else {
        msgOne.textContent = `Location: ${data.location}`;
        msgTwo.textContent = `Weather Info: ${data.weather_forecast}`;
      }
    });
    input.value = "";
  });
});

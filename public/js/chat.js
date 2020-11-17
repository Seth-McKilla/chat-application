const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = event.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

document.querySelector("#location-button").addEventListener("click", () => {
  if (!navigator.geolocation)
    return alert("Browser does not support geolocation services.");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log("Location shared!");
      }
    );
  });
});

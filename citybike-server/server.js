const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const constants = require("./constants");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
}); // < Interesting!
let interval;

io.on("connection", (socket) => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log("New connection " + socketId + " from " + clientIp);

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  axios
    .get(constants.NETWORK_STATIONS_URL)
    .then((response) => {
      socket.emit("CityBike", response.data.network.stations);
    })
    .catch((error) => {
      console.log(error);
      socket.emit("CityBike", "Error getting data");
    });
};

server.listen(port, () => console.log(`Listening on port ${port}`));

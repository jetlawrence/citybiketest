const express = require("express");
const router = express.Router();
const axios = require("axios");
const constants = require("../constants");

router.get("/", (req, res, next) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/bikes", (req, res, next) => {
  axios
    .get(constants.CITY_BIKE_URL)
    .then((response) => {
      res.send(response.data).status(200);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

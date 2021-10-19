const MAIN_API_URL = "http://api.citybik.es/v2";

module.exports = Object.freeze({
  NETWORK_URL: MAIN_API_URL + "/networks/decobike-miami-beach",
  NETWORK_STATIONS_URL:
    MAIN_API_URL + "/networks/decobike-miami-beach?fields=stations",
});

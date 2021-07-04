const moment = require("moment");

function gettimenow() {
  const FORMAT = "DD-MM-YYYY";
  return moment(new Date()).format(FORMAT);
}

function gettimeleft() {
  return moment().startOf("day").fromNow();
}

module.exports = { gettimenow, gettimeleft };

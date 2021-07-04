const moment = require("moment");

function gettimenow() {
  const FORMAT = "DD-MM-YYYY";
  return moment(new Date()).format(FORMAT);
}

module.exports = { gettimenow };

const { format } = require('timeago.js');
const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp); // formatea a '3 hours ago', por ejemplo
}

module.exports = helpers;
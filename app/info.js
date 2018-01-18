var client = require('./connection.js');

//Returns the Health of our index
client.cluster.health({},function(err,resp,status) {
    console.log("-- Client Health --",resp);
});

//Returns the number of constituencies in our index
client.count({index: 'gov',type: 'constituencies'},function(err,resp,status) {
    console.log("constituencies",resp);
});

//Returns the number of petitions in our index
client.count({index: 'gov',type: 'petitions'},function(err,resp,status) {
    console.log('petitions',resp);
});
var client = require('./connection.js');

client.indices.putMapping({
    index: 'gov',
    type: 'constituencies',
    body: {
        properties: {
            'constituencyname': {
                'type': 'string',
                'index': 'not_analyzed'
            },
            'electorate': {
                'type': 'integer'
            },
            'validvotes': {
                'type': 'integer'
            }
        }
    }
},function(err,resp,status){
    if (err) {
        console.log(err);
    }
    else {
        console.log(resp);
    }
});

client.indices.putMapping({
    index: 'gov',
    type: 'petitions',
    body: {
        properties: {
            'signatures_by_constituency': {
                'type': 'nested',
                properties: {
                    'name': {
                        'type': 'string',
                        'index': 'not_analyzed'
                    }
                }
            },
            'signatures_by_country': {
                'type': 'nested',
                properties: {
                    'name': {
                        'type': 'string',
                        'index': 'not_analyzed'
                    }
                }
            },
            'signature_count': {
                'type': 'integer'
            }
        }
    }
},function(err,resp){
    if (err) {
        console.log(err);
    }
    else {
        console.log(resp);
    }
});
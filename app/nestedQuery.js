var client=require ('./connection.js');
var argv = require('yargs').argv;

var results = function(constitLookup) {
    client.search({
        index: 'gov',
        type: 'petitions',
        _source: ['action','signature_count'],
        body: {
            query: {
                bool: {
                    must: [
                        { match: { 'state': 'open' }},
                        { range : {
                                'signature_count' : {
                                    'gte' : 10000
                                }
                            }
                        },
                        ,
                        { nested: {
                                path: 'signatures_by_constituency',
                                query: {
                                    bool: {
                                        must: [
                                            { 'match': { 'signatures_by_constituency.name': constitLookup }}
                                        ]
                                    }
                                }
                            }}
                    ]
                }
            },
            sort: {
                'signatures_by_constituency.signature_count': {
                    order: 'desc',
                }
            }
        }
    },function (error, response,status) {
        if (error){
            console.log("search error: "+error)
        }
        else {
            response.hits.hits.forEach(function(hit){
                console.log(hit);
            })
        }
    });
}

if (argv.search) {
    var constitLookup=argv.search;
    console.log("Search term: "+constitLookup);
    results(constitLookup);
}
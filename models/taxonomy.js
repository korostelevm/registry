// user.js
// User model logic.

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase({
    // Support specifying database info via environment variables,
    // but assume Neo4j installation defaults.
    url: 'http://neo4j:4234475a@localhost:7474/',
//    auth: 'Basic ' + new Buffer("neo4j:4234475a").toString('base64')
});

var Taxonomy = module.exports = function Taxonomy(_node) {
    // All we'll really store is the node; the rest of our properties will be
    // derivable or just pass-through properties (see below).
    
    this._node = _node;
}

Taxonomy.prototype.connect = function (thisName, otherName, cost, callback) {
var query = [
        'MATCH (a {name: {thisName}})',
        'MATCH (b {name: {otherName}})',
        'MERGE (a) -[rel:related_to {cost:{cost}}]- (b)',
        'RETURN rel'
    ].join('\n')
 
    var params = {
//        thisName: this.name,
        thisName: thisName,
        otherName: otherName,
        cost: +(cost)
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err) {
        callback(err);
    });
};

Taxonomy.prototype.create = function ( type, name, mongo_ref, callback) {
    var label = "Taxonomy"
    if(type)
        label = type
    var query = [
        'MERGE (a:'+ label +' { name : {name} , type : {type}, mongo_ref: {mongo_ref} })',
        'RETURN a'
    ].join('\n')

    var params = {
        name: name,
        type: type,
        mongo_ref: mongo_ref
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        callback(err, results);
    });
};


Taxonomy.prototype.get = function (type, name, mongo_ref, callback) {
    var query = [];
    var label = ""
    if(type){
        query.push('type : {type}')
        label += ':' +type}
    if(name)
        query.push('name : {name}')
    if(mongo_ref)
        query.push('mongo_ref: {mongo_ref}')
    
    var query = [
        'MATCH  (taxonomy'+ label +' { '+ query +' })',
        'OPTIONAL MATCH  (taxonomy { '+ query +' })-[r:related_to]->(b)',
        'RETURN DISTINCT taxonomy, collect(b) as linked',
    ].join('\n')

    var params = {
        type: type,
        name: name,
        mongo_ref: mongo_ref,
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        callback(err, results);
    });
};
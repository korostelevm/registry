var express = require('express');
var router = express.Router();
var Taxonomy = require('../models/taxonomy');

function getUserURL(user) {
    //    return '/users/' + encodeURIComponent(user.username);
}

function final() {
    console.log('Done', results);
}

function updateDb(query, callback) {

}
router.get('/register', function (req, res) {
    console.log(req.query)
    var db = req.db;
    var collection = db.get('superheros');
    var output = 'good';
    var index = 0;
    var message = req.query;


    collection.findAndModify({
            "query": {
                "alter_ego": message.name
            },
            "update": {
                "$set": {
                    //            "costume": message.costume,
                    "alter_ego": ""
                }
            },
            //        "options": { "new": true, "upsert": true }
            "options": {}
        },
        function (err, doc) {



            collection.findAndModify({
                    "query": {
                        "costume": message.costume
                    },
                    "update": {
                        "$set": {
                            //                    "costume": message.costume,
                            "alter_ego": message.name
                        }
                    },
                },
                function (err, doc) {

                    if (err) throw err;
                    
                    if (!doc) {
                        collection.insert({
                            "costume": message.costume,
                            "alter_ego": message.name
                        }, function (err, doc) {
                            if (err) throw err;
                            return res.json(doc)
                        });
                    }else{
                        return res.json(doc)
                    }
                }
            );
        }
    );


});




/* GET home page. */
router.get('/get_registry', function (req, res) {

    //    var output = {
    //        superheroes: [{
    //            _id: '55f88b875c70714f2fd5689a',
    //            costume: 'Mr. Freeze',
    //            alter_ego: 'Mike'
    //        }]
    //    }
    //    res.json(output);

    console.log("index yooo")
    var db = req.db;
    var collection = db.get('superheros');

    collection.find({}, {}, function (e, docs) {
        var output = {
            "superheroes": docs
        };
        res.json(output);
    });

});


/* GET home page. */
router.get('/', function (req, res) {


    res.render('index', {
        "planet": "world"
    });

});

module.exports = router;
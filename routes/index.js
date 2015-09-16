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
    var items = req.query;
    for (var name in req.query) {
        if (req.query[name].length > 0) {
            if (name.split("_").length > 1) {
                var id = name.split("_")[0];
                console.log("REMOVE " + name.split("_")[0] + ": " + req.query[name]);
                var alter_ego = req.query[name];


                collection.findOne(id, function (e, docs) {
                    if (docs.alter_ego == alter_ego) {
                        collection.updateById(id, {
                            $set: {
                                alter_ego: ""
                            }
                        }, function (error,docs) {
                            console.log(error)
                            output = "removed";
                            return res.json({message:output, name: alter_ego});

                        });
                    } else {
                        output = "wrong"
                        return res.json({message:output, name: alter_ego, hero: docs.costume});

                    }

                });
            } else {
                var id = name.split("_")[0];
                var alter_ego = req.query[name];
                collection.findOne({
                    alter_ego: alter_ego
                }, function (e, docs) {


                    if (!docs) {
                        collection.updateById(id, {
                            $set: {
                                alter_ego: alter_ego
                            }
                        }, function (error) {
                            console.log(error)
                            output = "reg"
                            return res.json({message:output, name: alter_ego});
                        });
                    }else{
                        output = "exists"
                        console.log(alter_ego)
                        console.log(docs)
                        return res.json({message:output,name:docs.alter_ego});
                    }
                });
            }
        }
        if (index == Object.keys(items).length - 1) {
        }
        index++;
    }



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
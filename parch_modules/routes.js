var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function(app, URL) {
    app.get('/', urlencodedParser, function(req, res) {
        // Creating a new url record
        var newURL = new URL({
            markUp: ""
        });
        newURL.save(function(err, doc) {
            if (err) throw err;
            console.log('URL saved successfully!' + doc.handle);
            res.redirect('http://107.170.128.220:8800/' + doc.handle);
        });
    });

    app.post('/getHandle', urlencodedParser, function(req, res) {
        //console.log("Looking for this handle: " + req.body.handle);
        URL.find({
                handle: req.body.handle
            },
            // if exists then fetch the mark ups
            function(err, docs) {
                if (docs.length == 1) {
                    //console.log(docs[0].markUp);
                    res.send(docs[0].markUp);
                }
            });
    });

    app.post('/save', urlencodedParser, function(req, res) {
        //console.log("Received mark up: " + req.body.markUp);
        URL.findOne({
            handle: req.body.handle
        }, function(err, doc) {
            doc.markUp = req.body.markUp;
            doc.save(function() {
                res.send()
            });
        });
    });

    app.get('/:handle', urlencodedParser, function(req, res) {
        res.render('.. / public / views
/index');
    });

}

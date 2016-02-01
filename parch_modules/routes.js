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
            res.redirect('http://localhost:8800/' + doc.handle);
        });
    });

    app.get('/getHandle', urlencodedParser, function(req, res) {
        URL.find({
                handle: req.handle
            },
            // if exists then fetch the mark ups
            function(err, docs) {
                if (docs.length == 1) {
                    res.send(docs[0].markUp);
                }
            });
    });

    app.post('/save', urlencodedParser, function(req, res) {
        Model.findOne({
            handle: req.body.handle
        }, function(err, doc) {
            doc.markUp = req.body.markUp;
            doc.save(function() {
                res.end()
            });
        });
    });

    app.get('/:handle', urlencodedParser, function(req, res) {
        res.render('../public/index');
    });

}

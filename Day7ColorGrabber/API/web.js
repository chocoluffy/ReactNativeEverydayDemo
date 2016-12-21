var express = require('express');
// var bodyParser = require('body-parser'); // not suitable in this case.
var multiparty = require('multiparty');
var drawOverlay = require('./index.js');

var app = express();
app.use(express.static('public'));

/**
 * Handle form data, not suitable in this case.
 */
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function(req, res) {
    var timestamp = new Date().getTime();
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        // console.log(fields, files);
        var imBaseCode = fields['data'];
        // important!! drawOverlay func is asychronous!! use promise here!
        // var promise = new Promise(function(resolve, reject){
        //     var resultBaseCode = drawOverlay(files['file[]'][0]['path'], timestamp, imBaseCode);
        //     if(resultBaseCode){
        //       console.log('receive basecode from server.');
        //       resolve(resultBaseCode);
        //     }
        //     else{
        //       reject(Error('error'));
        //     }
        // });
        //
        // promise.then(function(basecode){
        //   console.log(basecode);
        //   var result = JSON.stringify({
        //     'id': timestamp,
        //     'resultBaseCode': basecode
        //   });
        //   console.log('result json for client:', result);
        //   res.send(result);
        // }, function(err){
        //   console.log(err);
        //   res.send(err);
        // });

        // above attempt is try using promise, here, i pass a cb to it.
        drawOverlay(files['file[]'][0]['path'], timestamp, imBaseCode, function(basecode){
          // console.log(basecode);
          var result = JSON.stringify({
            'id': timestamp,
            'resultBaseCode': basecode
          });
          // console.log('result json for client:', result);
          res.send(result);
        });

    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})

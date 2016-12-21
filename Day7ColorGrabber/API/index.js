// Constants
var bgSvg =  "https://rioaraki.github.io/addLogo/background.svg";
var logoSvg = "https://rioaraki.github.io/addLogo/logo.svg";
var bgPng = "https://s11.postimg.org/xix2wactv/background.png";
var logoPng = "https://s15.postimg.org/jfr4eiyln/logo.png";

// pronounced fuss
var fs = require('fs');
var https = require('https');
// hope u `npm install --save canvas` already!
var Canvas = require('canvas');
var Image = Canvas.Image;

// A simple helper function to load image data from the file system. i'm not gonna annotate this function because it's boring.
// Suffice to say that it turns data into pixels and other than that just accept it ok, gosh.
function loadFile(path, cb){
  fs.readFile(path, function(err, data){
    if (err) throw err
    var img = new Image();
    img.onload = function() {
      cb(img);
    }
    img.src = data;
  })
}

function loadImFromBaseCode(code, cb){
  var img = new Image();
  img.onload = function() {
    cb(img);
  }
  var basecode = 'data:image/png;base64,' + code;
  // console.log(basecode);
  img.src = basecode;
}

function loadImFromSrc(source, cb){
  https.get(source, function (res) {
    var buf = '';
    res.setEncoding('binary');
    res.on('data', function(chunk){ buf += chunk; });
    res.on('end', function(){
        var image = new Image();
        image.onload = function(){
            cb(image);
        };
        image.onerror = function(err){
            console.log("loading from https source", err);
        };
        image.src = new Buffer(buf, 'binary');
    });
  });
}

module.exports = function(source, timestamp, imBaseCode, cb){
  // use our helper function to load the middle finger image, yeah.
  // loadFile('./public/data/background.png', function(bg){
  loadImFromSrc(bgPng, function(bg){
    // get the size of the image. i suppose i could hardcode this, it'll never change. oh well. lazy.
    var width = bg.width
    var height = bg.height
    // console.log('canvas matrix: ', width, height);

    // make a new canvas that is the same size as the middle finger image, because we wouldn't want to let that get distorted or lose any fidelity
    canvas = new Canvas(width, height)

    // get that context
    ctx = canvas.getContext('2d')

    // load logo file
    // loadFile('./public/data/logo.png', function(logo){
    loadImFromSrc(logoPng, function(logo){

      // load in target image
      // loadFile(source, function(raw){
      loadImFromBaseCode(imBaseCode, function(raw){ // instead of using path, use base64 encoding now!

        // draw the target image to the context, scaling it to the size of the canvas.
        // The other 4 arguments are the x,y coordinates for the top-left and bottom-right corners of the image.
        ctx.drawImage(raw, 0, 0, width, height)

        // draw the middle finger on top of the corporation.
        // If, for example, you wanted to draw it only on the right half of the canvas you would instead pass `(bg, width/2, height/2, width, height)`
        ctx.drawImage(bg, 0, 0, width, height)
        ctx.drawImage(logo, 0, 0, width, height)

        // use cb
        cb(canvas.toDataURL());

        // use promise.
        // var promise = new Promise(function(resolve, reject){
        //   var result = canvas.toDataURL();
        //   if(result){
        //     resolve(result);
        //   }
        //   else{
        //     reject(Error('error'));
        //   }
        // });
        //
        // promise.then(function(result){
        //   console.log('promise giving result');
        //   return result;
        // }, function(err){
        //   console.log(err);
        // });

        // console.log(result[0]);
        // var filename = './public/output/' + timestamp + '.png'
        // fs.writeFileSync(filename, canvas.toBuffer())
        // return result;
      })
    })
  })
}

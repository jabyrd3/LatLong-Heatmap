var heatmap = require('heatmap');
var fs = require('fs');
var obj;

var x0 = -77.997290;
var x500 = -77.371239;
var y0 = 42.939964;
var y500 = 43.369159;
var width = (x500 - x0);
var height = (y500 - y0);
var aspectRatio = width/height;
height = 1000;
width = height * aspectRatio;

var diffX = x500 - x0;
var diffY = y500 - y0;
//console.log(diffX, diffY);
fs.readFile('data.json', 'utf8', function(err,data){
    if(err) throw err;
    obj = JSON.parse(data);
    //console.log(obj.length);
    findBounds(obj);
});

function findBounds(obj){
    
    var heat = heatmap(width, height, { radius : 3 });
    console.log(obj.length);
    for (var a = 0; a < obj.length; a++) {
        var ding = obj[a];
        var x = width - parseInt(((x500 - ding.Longitude) * width) / diffX );
        var y = parseInt(((y500 - ding.Latitude) * height) / diffY );
        //if(a % 1000 == 0){ console.log(x, y); }
        heat.addPoint(x, y);
    }
    heat.draw();
    var fs = require('fs');
    fs.writeFileSync('blob.png', heat.canvas.toBuffer());
}

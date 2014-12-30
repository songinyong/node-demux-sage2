node-demux
==========

Example Usage:
```
var fs    = require('fs');
var demux = require('node-demux');


var start;
var nframes;
var format;

var video = new demux();
video.on('error', function(err) {
    console.log(err);
});
video.on('metadata', function(metadata) {
    nframes = metadata.num_frames;
    format = metadata.pixel_format;
    console.log(metadata);
});
video.on('start', function() {
    start = Date.now();
    console.log("start demuxing");
});
video.on('end', function() {
    var time = (Date.now() - start) / 1000;
    console.log("finished demuxing");
    console.log("  total time: " + time.toFixed(1) + "sec");
    console.log("  average frames per second: " + (nframes/time).toFixed(1) + "fps");
});
video.on('frame', function(frameIdx, data) {
    console.log("received frame " + frameIdx + " (size: " + data.length + ")"); 
    fs.writeFile("out/vid1_" + frameIdx + "." + format, data, function (err) {
        if (err) throw err;
    });
});
video.loadVideo("videos/myvid.mp4");
video.startDemuxing();
```

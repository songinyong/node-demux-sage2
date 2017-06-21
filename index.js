// var node_demux = require('./build/Release/node_demux');

var path = require('path');
var binary = require('node-pre-gyp');
var node_demux_path = binary.find(path.resolve(path.join(__dirname,'./package.json')));
var node_demux = require(node_demux_path);

var messages = [
	"error",
	"metadata",
	"start",
	"end",
	"frame"
];

function demux() {
	this.video = new node_demux.VideoDemux();
	
	this.load = function(filename, options) {
		if(options) this.video.LoadVideo(filename, options);
		else        this.video.LoadVideo(filename);
	};
	
	this.play = function() {
		this.video.StartDemuxing();
	};

	this.nextFrame = function() {
		this.video.DemuxFrame();
	};
	
	this.pause = function(cb) {
		this.video.PauseDemuxing(cb);
	};
	
	this.stop = function(cb) {
		this.video.StopDemuxing(cb);
	};
	
	this.seek = function(timestamp, cb) {
		this.video.SeekVideo(timestamp, cb);
	};
	
	this.on = function(type, cb) {
		if (messages.indexOf(type) >= 0) {
			this.video.On(type, cb);
		}
	};
}

module.exports = demux;

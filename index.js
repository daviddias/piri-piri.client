var io = require('socket.io-client');

exports = module.exports;

var ioClient;
var commands = {};

exports.start = function(options, cb) {
  var url = (options.url || 'http://localhost:9876');
  ioClient = io(url);

  ioClient.on('connect', cb);

  ioClient.on('execute', function(command) {
    if(commands[command.order] === undefined) { 
      return console.log(command.order + 'is not registred');
    } 
    commands[command](command.data);
  });
};

exports.register = function (command, action) {
  commands[command] = action;
};

exports.tell = function (data) {
  var info = {
    data: data,
    timestamp: Date.now()
  };

  ioClient.emit('info', info);
};

// TODO
// - Build an helper that automatically pipes messages from EventEmitters directly
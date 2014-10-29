var io = require('socket.io-client');

exports = module.exports;

var ioClient;

exports.start = function(options, cb) {
  var url = (options.url || 'http://localhost:9876');
  ioClient = io(url);

  ioClient.on('connect', function (){
    cb();
  });
};

exports.registerAction = function (command, action) {
  ioClient.on(command, action);
};

exports.sendMessage = function (message) {
  // TODO populate message with date from this machine;
  ioClient.emit('message', message);
};

// TODO
// - Build an helper that automatically pipes messages from EventEmitters directly
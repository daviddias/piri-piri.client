var io = require('socket.io-client');

exports = module.exports;

var ioClient;
var ppId;

exports.start = function(options, cb) {
  var url = (options.url || 'http://localhost:9876');
  ioClient = io(url);

  ppId = ((~~(Math.random() * 1e9)).toString(36) + Date.now());

  ioClient.on('connect', cb);
};

exports.registerAction = function (command, action) {
  ioClient.on(command, action);
};

exports.sendMessage = function (message) {
  var envelope = {
    message: message,
    date: Date.now(),
    ppId: ppId
  };
  console.log('SENDING MESSAGE');
  ioClient.emit('message', envelope);
};

// TODO
// - Build an helper that automatically pipes messages from EventEmitters directly
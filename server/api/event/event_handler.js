var io = require('socket.io')(3300);

function EventHandler() {
}

EventHandler.prototype = {

  setCurrent: function (c) {
    this.current = c;
  },

  process: function (message) {
    this.doPin(message, "pin1")
  },

  doPin: function (message, socketChannel) {
    if (this.current && message) {
      var msgObj = JSON.parse(message);
      var filterEventType = this.current.type;
      var filterProp = this.current.filter;

      if (filterEventType && filterProp) {
        if (filterEventType == msgObj.filter && msgObj.type == filterProp) {
          io.emit(socketChannel, {});
        }
      } else if (filterEventType) {
        if (filterEventType == msgObj.filter) {
          io.emit(socketChannel, {});
        }
      } else {
        io.emit(socketChannel, {});
      }

    }
  }
};

exports.EventHandler = EventHandler;

exports.createHandler = function () {
  return new EventHandler();
};

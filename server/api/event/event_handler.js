var io = require('socket.io')(3300);

function EventHandler() {
}

EventHandler.prototype = {

  setLed1: function (c) {
    this.led1 = c;
  },

  setLed2: function (c) {
    this.led2 = c;
  },

  process: function (message) {
    this.doPin(message, "pin1", this.led1);
    this.doPin(message, "pin1", this.led2)
  },

  doPin: function (message, socketChannel, led) {
    if (led.filter && message) {
      var msgObj = JSON.parse(message);
      var filterEventType = led.filter['type'].id;
      var filterProp = led.filter.prop;

      if (filterEventType && filterProp) {
        if (filterEventType == msgObj['type'] && msgObj[filterProp.name] == filterProp.value) {
          io.emit(socketChannel, {});
        }
      } else if (filterEventType) {
        if (filterEventType == msgObj['type']) {
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

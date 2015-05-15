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
    this.doPin(message, "pin2", this.led2)
  },

  filterEvent: function (message, filters) {
    var event = JSON.parse(message);
    var match = true;
    filters.forEach(function (filter) {
      switch (filter.op) {
        case '=' :
          match = match && event[filter.name] == filter.value;
          break;
        case '>' :
          match = match && event[filter.name] > filter.value;
          break;
        case '<' :
          match = match && event[filter.name] < filter.value;
          break;
        case '>=' :
          match = match && event[filter.name] >= filter.value;
          break;
        case '<=' :
          match = match && event[filter.name] <= filter.value;
          break;
        case 'contains' :
          var pattern = new RegExp(filter.value);
          match = pattern.test(event[filter.name].toString());
          break;
      }
    });
    return match;
  },


  doPin: function (message, socketChannel, led) {
    if (this.filterEvent(message, led.filters)) {
      io.emit(socketChannel, {});
    }
  }
};

exports.EventHandler = EventHandler;

exports.createHandler = function () {
  return new EventHandler();
};

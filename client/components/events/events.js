angular.module('adminYoApp')
  .factory('Event', function ($rootScope, $modal) {
    return {
      findAll: function () {
        return [
          {
            id: "user_added",
            label: "User Registration"
          },
          {
            id: "photo_upload",
            label: "Photo Upload"
          },
          {
            id: "like_added",
            label: "Like"
          },
          {
            id: "following_added",
            label: "Following"
          },
          {
            id: "comment_added",
            label: "Comment"
          },
          {
            id: "stream_added",
            label: "Stream Added"
          }
        ]
      }
    }
  });

angular.module('adminYoApp')
  .controller('EventController', ['$scope', '$http', 'Event', function ($scope, $http, Event) {
    $scope.events = Event.findAll();
    $scope.filters = ["platform", "version", "country"];
    $scope.led1 = {};
    $scope.led2 = {};

    $scope.ops = ['=', '>', '<', '>=', '<=', 'contains'];

    $http.get('/api/event/led1/filters').success(function (data) {
      $scope.led1 = data;
    });

    $http.get('/api/event/led2/filters').success(function (data) {
      $scope.led2 = data;
    });

    $scope.sendInfo = function () {
      $http.post('/api/event', {
        led1: $scope.led1,
        led2: $scope.led2
      });
    };

  }])
  .controller('AlertController', ['$scope', '$http', function ($scope, $http) {

    $http.get('/api/event/alerts').success(function (data) {
      $scope.alerts = data;
    });


    $scope.save = function () {
      $http.post('/api/event/alerts', $scope.alerts)
    };

    $scope.addAlert = function () {
      $scope.alerts.push({condition: {}})
    };

    $scope.remove = function (alert) {
      var index = $scope.alerts.indexOf(alert);
      $scope.alerts.splice(index, 1);
    }

  }]);

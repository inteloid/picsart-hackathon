angular.module('adminYoApp')
  .factory('Event', function ($rootScope, $modal) {
    return {
      findAll: function () {
        return [
          {
            id: "photo_upload",
            label: "Photo Upload"
          },
          {
            id: "like_added",
            label: "Like"
          },
          {
            id: "effect_apply",
            label: "Effect Apply"
          },
          {
            id: "app_install",
            label: "Application Installed"
          },
          {
            id: "user_added",
            label: "User Registration"
          }
        ]
      }
    }
  });

angular.module('adminYoApp')
  .controller('EventController', ['$scope', '$http', 'Event', function ($scope, $http, Event) {
    $scope.events = Event.findAll();
    $scope.filters = ["platform", "version"];
    $scope.led1 = {};
    $scope.led2 = {};

    $scope.sendInfo = function () {
      $http.post('/api/event', {
        led1: $scope.led1,
        led2: $scope.led2
      });
    };

  }]);

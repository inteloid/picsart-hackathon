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

    $scope.led1.filters = [
      {
        name: 'type',
        op: '='
      },
      {
        name: 'version',
        'op': '='
      }
    ];
    $scope.led2.filters = [
      {
        name: 'type',
        op: '='
      },
      {
        name: 'version',
        'op': '='
      }
    ];

    $scope.sendInfo = function () {
      $http.post('/api/event', {
        led1: $scope.led1,
        led2: $scope.led2
      });
    };

  }]);

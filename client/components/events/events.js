angular.module('adminYoApp')
  .factory('Event', function ($rootScope, $modal) {
    return {
      findAll : function(){
        return [
          {
            id: "photo_upload",
            label : "Photo Upload"
          },
          {
            id: "like_added",
            label : "Like"
          },
          {
            id: "effect_apply",
            label : "Effect Apply"
          },
          {
            id: "app_install",
            label : "Application Installed"
          },
          {
            id: "user_added",
            label : "User Registration"
          }
        ]
      }
    }
  });

angular.module('adminYoApp')
  .controller('EventController', ['$scope', '$http', 'Event', function($scope, $http, Event) {
    $scope.events = Event.findAll();
    $scope.filters = ["platform", "version"];
    $scope.currentEvent = {};
    $scope.currentEvent.type = {
      id: "app_install",
      label : "Application Installed"
    };
    $scope.currentEvent.filter = "version";

    $scope.sendInfo = function(){
      if($scope.currentEvent.type && $scope.currentEvent.filter) {
        $http.post('/api/event', { data: $scope.currentEvent });
      }
    };

}]);

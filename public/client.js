angular.module('reddit', [])

.service('r', function($http) {
  return {
    subReddit: function(sub) {
      $http.get('/r/' + sub).then
    }
  }
})
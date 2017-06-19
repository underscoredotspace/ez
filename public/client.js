window.angular.module('eztv', [])

.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|magnet):/);
    }
])

.service('eztv', function($http) {
  return {
    get: function(cb) {
      $http.get('/eztv').then(
        function(res) {
          cb({data: res.data})
        }, function(res) {
          cb({error: res})
        }
      )
    }
  }
})

.controller('eztvget', eztvController)

eztvController.$inject = ['$scope', 'eztv']

function eztvController($scope, e) {
  e.get(res => {
    if (res.err) {
      console.log(res.err)
    } else {
      console.log(res)
      $scope.torrents = res.data
    }
  })
}
angular.module('reddit', [])

.service('r', function($http) {
  return {
    subReddit: function(sub) {
      $http.get('/r/' + sub).then(
        function(res) {
          console.log(res)
          return {data: res.data}
        }, function(res) {
          return {error: res}
        }
      )
    }
  }
})

.directive('rSub', function(r) {
  return {
    restrict: 'A', 
    compile: function() {
      return {
        pre: function(scope, element, attribs) {
          element.bind('click', function(e) {
            r.subReddit(attribs.rSub)
          })
        }
      }
    }
  }
})
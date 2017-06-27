window.angular.module('eztv', [])

window.angular.module('eztv').config(options)

options.$inject = ['$compileProvider']

function options($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|magnet):/)
}

window.angular.module('eztv').service('eztv', eztvS
                                      
function eztvService ($http) {
  return {
    get: function(page, cb) {
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

window.angular.module('eztv').controller('eztvget', eztvController)

eztvController.$inject = ['$scope', 'eztv']

function eztvController($scope, eztv) {
  let page
  
  
  
  eztv.get(page, res => {
    if (res.err) {
      console.log(res.err)
    } else {
      console.log(res)
      $scope.torrents = res.data
    }
  })
}
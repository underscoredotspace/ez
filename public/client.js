window.angular.module('eztv', [])

.service('eztv', function($http) {
  return {
    get: function(sub, cb) {
      $http.get('/eztv').then(
        function(res) {
          cb({data: res.data})
        }, function(res) {
          return ({error: res})
        }
      )
    }
  }
})

.controller('eztvget', eztvController)

eztvController.$inject = ['eztv']

function eztvController(e) {
  e.get(res => {
    if (res.err) {
      alert('there was an error')
      console.log(res.err)
    } else {
      console.log(res.data)
    }
  })
}
(function() {
  window.angular.module('eztv', ['ngRoute'])
})();

(function() {
  window.angular.module('eztv').config(config)
  config.$inject = ['$compileProvider', '$routeProvider']
  
  function config($compileProvider, $routeProvider) {
    routerConfig($routeProvider)
    appConfig($compileProvider)
  }
  
  function routerConfig($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'eztvget',
      controllerAs: 'vm',
      templage
    })
    .when('/:page', {
      controller: 'eztvget',
      controllerAs: 'vm'
    })
  }

  function appConfig($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|magnet):/)
  }
})();

(function() {
  window.angular.module('eztv').service('eztv', eztvService)          
  eztvService.$inject = ['$http']

  function eztvService ($http) {
    return {get}

    function get(page, cb) {
      $http.get('/eztv')
      .then(
      function(res) {
        cb({data: res.data})
      }, function(res) {
        cb({error: res})
      })
    }
  }
})();

(function() {
  window.angular.module('eztv').controller('eztvget', eztvController)
  eztvController.$inject = ['$scope', '$routeParams','eztv']

  function eztvController($scope, $routeParams, eztv) {
    let page

    if (window.angular.isDefined($routeParams.page)) {
      page = $routeParams.page
    }
    
    console.log(page)

    eztv.get(page, res => {
      if (res.err) {
        console.log(res.err)
      } else {
        console.log(res)
        $scope.torrents = res.data
      }
    })
  }
})();
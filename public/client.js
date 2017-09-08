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
    .when('/:page', {
      controller: 'eztvget',
      controllerAs: 'vm',
      templateUrl: 'template.html'
    })
    .when('/:page/:search', {
      controller: 'eztvget',
      controllerAs: 'vm',
      templateUrl: 'template.html'
    })
    .otherwise({redirectTo: '/1'})
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

    function get(page = '1', cb) {
      $http.get('/eztv/' + page)
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
  eztvController.$inject = ['$routeParams','eztv']

  function eztvController($routeParams, eztv) {
    const vm = this

    if (window.angular.isDefined($routeParams.search)) {
      vm.search = $routeParams.search
    }
    
    if (window.angular.isDefined($routeParams.page)) {
      vm.page = Number($routeParams.page)
      vm.next = vm.page + 1
      vm.prev = vm.page - 1
    }

    eztv.get(vm.page, res => {
      if (res.err) {
        vm.torrents = {err:true}
      } else {
        vm.torrents = res.data
      }
    })
  }
})();
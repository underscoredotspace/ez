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
        .then(res => cb({data: res.data}))
        .catch(res => cb({error: res}))
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
      if (res.error) {
        vm.torrents = {err:true}
      } else {
        vm.torrents = res.data
        vm.from = vm.torrents[0].date_released_unix * 1000
        vm.to = vm.torrents[vm.torrents.length-1].date_released_unix * 1000
      }
    })
  }
})();
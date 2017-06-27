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
    const vTemplate = `<div ng-repeat="torrent in torrents">
      <a ng-href="{{torrent.magnet_url}}">{{torrent.title}}</a> [{{torrent.seeds}}/{{torrent.peers}}]
      </div>`
    $routeProvider
    .when('/', {
      controller: 'eztvget',
      controllerAs: 'vm',
      template: vTemplate
    })
    .when('/:page', {
      controller: 'eztvget',
      controllerAs: 'vm',
      template: vTemplate
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
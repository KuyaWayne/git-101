(function(angular) {
  'use strict';
  angular
    .module('axa')
    .config(httpConfig)
    .config(config);

  function httpConfig($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }

  function config($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    var RegisterState = {
      name: 'register',
      url: '/',
      templateUrl: 'static/axa/register/register.template.html',
      controller: 'RegisterCtrl',
      controllerAs: 'register'
    };

    $stateProvider.state(RegisterState);
  }
})(angular);

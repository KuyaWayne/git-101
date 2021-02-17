(function(angular) {
  'use strict';
  angular
    .module('axa')
    .factory('RegisterSrvc', RegisterService);

  var headers = { 'Content-Type': 'application/json' };

  function RegisterService($http) {
    return {
      register: register,
      sendSchedule: sendSchedule,
      upload: upload
    };

    function register(data) {
      return $http.post('/api/register', data, { headers: headers });
    }

    function sendSchedule(data) {
      return $http.post('/api/schedule', data, { headers: headers });
    }

    function upload(data) {
      return $http.post('/api/upload', data, { headers: headers });
    }
  }
})(angular);

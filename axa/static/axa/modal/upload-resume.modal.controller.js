(function(angular) {
  'use strict';
  angular
    .module('axa')
    .controller('UploadCtrl', UploadController);

  function UploadController($uibModalInstance) {
    var vm = this;
    vm.file = '';

    vm.ok = function() {
      vm.form.$submitted = true;
      if (!vm.file) {
        return;
      }
      $uibModalInstance.close(vm.file);
    };

    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
})(angular);

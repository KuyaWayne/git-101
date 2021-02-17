(function(angular) {
  'use strict';
  angular
    .module('axa')
    .controller('RegisterCtrl', RegisterController);

  function RegisterController($filter, $uibModal, RegisterSrvc) {
    var vm = this;
    vm.data = {};
    vm.file = {
      file: {
        mime: "application/pdf"
      }
    };
    vm.schedule = {
      Online: true
    };

    vm.register = register;
    vm.schedule = schedule;
    vm.sendResume = sendResume;
    vm.uploadResume = uploadResume;

    function getBase64(file) {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          var encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
          if ((encoded.length % 4) > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
    }

    function register() {
      vm.frmRegister.$submitted = true;
      if (vm.frmRegister.$invalid) {
        return;
      }
      RegisterSrvc.register(vm.data).then(function(response) {
        if (response.data.status.toUpperCase() == 'SUCCESS') {
          vm.frmRegister.$submitted = false;
        }
      }, function(err) {
        console.log(err);
      });
    }

    function schedule() {
      angular.element(document.querySelector('.hours input')).attr('required', true);
      angular.element(document.querySelector('.minutes input')).attr('required', true);
      vm.frmSchedule.$submitted = true;
      if (vm.frmSchedule.$invalid) {
        return;
      }
      var timeFormat = 'hmma';
      vm.schedule.ProposedDate = $filter('date')(vm.date, 'yyyy-MM-dd');
      if (vm.time.getMinutes() == 0) {
        timeFormat = 'ha';
      }
      vm.schedule.ProposedTime = $filter('date')(vm.time, timeFormat);
      RegisterSrvc.sendSchedule(vm.schedule).then(function(response) {
        if (response.data.status.toUpperCase() == 'SUCCESS') {
          vm.frmSchedule.$submitted = false;
        }
      }, function(err) {
        console.log(err);
      });
    }

    function sendResume() {
      vm.frmResume.$submitted = true;
      if (vm.frmResume.$invalid || vm.resume) {
        return;
      }
      getBase64(vm.resume).then(function(data) {
        vm.file.data = data;
        RegisterSrvc.upload(vm.file).then(function(response) {
          if (response.data.status.toUpperCase() == 'SUCCESS') {
            vm.frmResume.$submitted = false;
          }
        }, function(err) {
          console.log(err);
        });
      });
    }

    function uploadResume() {
      vm.invalidFile = false;
      var modalInstance = $uibModal.open({
        templateUrl: '/static/axa/modal/upload-resume.modal.template.html',
        controller: 'UploadCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        backdropClass: 'show',
        windowClass: 'show',
        keyboard: false,
      });
      modalInstance.result.then(function(data) {
        vm.resume = data;
      }, function() {
      });
    }
  }
})(angular);

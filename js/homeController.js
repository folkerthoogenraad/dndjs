app.controller('HomeController', ['$scope', '$location', '$http', '$uibModal', 'user', function($scope, $location, $http, $uibModal, user) {
  //TODO validate key!
  if(!window.localStorage.getItem("key")){
    $location.path('login');
    return;
  }

  $scope.name = "MISSINGNO";

  //Request user information
  $http({
    method: 'GET',
    url: baseUrl+'/users/me?key='+window.localStorage.getItem("key"),
  }).then(function successCallback(response) {
    //Success
    $scope.name = response.data.name;
  }, function errorCallback(response) {
    //Error
    console.log("Key is not valid probably.");
    $location.path('login');
    $scope.$apply();
  });

  $scope.inventory = function(){
    $uibModal.open({
      templateUrl: 'modals/inv.html'
    });
  };
  $scope.chat = function(){
    swal("Unimplemented", "The chat function is not yet implemented.", "error");
  };
  $scope.logout = function(){
    swal({
      title: "Are you sure?",
      text: "You are about to log out.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Log out",
      closeOnConfirm: true
    }, function(){
      window.localStorage.removeItem("key");
      $location.path('login');
      $scope.$apply();
    });
  };
  $scope.map = function(){
    swal("Unimplemented", "The map function is not yet implemented.", "error");
  };

}]);

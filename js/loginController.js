app.controller('LoginController', ['$scope', '$location', '$http', '$uibModal', 'user', function($scope, $location, $http, $uibModal, user) {

  if(window.localStorage.getItem("key")){
    window.localStorage.removeItem("key");
  }

  $scope.canInput = true;
  $scope.username = "";
  $scope.password = "default";

  //For testing only ofc
  /*$uibModal.open({
    templateUrl: 'modals/loot.html',
    controller: 'TestController',
  });*/

  $scope.submit = function(){
    if($scope.username.length < 3){
      swal("Invalid username", "Username is too short!", "error");
      return;
    }
    if($scope.password.length < 3){
      swal("Invalid password", "Password is too short!", "error");
      return;
    }

    $scope.canInput = false;
    $http({
      method: 'GET',
      url: baseUrl+'/token?username='+$scope.username+'&password='+$scope.password,
    }).then(function successCallback(response) {
      //Success
      window.localStorage.setItem("key", response.data.key);
      user = response.data.name;
      $location.path('home');
    }, function errorCallback(response) {
      console.dir(response);
      //Error
      if(response.status == 401){
        swal("Password Required", "Please enter your password below. (aka contact developer, this is not yet implemented as you can see.)", "info");
      }
      if(response.status == 404){
        swal("User does not exist", "This is your first time logging in!", "info");
      }
      if(response.status < 0){
        swal("Error", "Login server couldn't be reached", "error");
      }
      $scope.canInput = true;
    });
  };

  $scope.register = function(){

  };
}]);

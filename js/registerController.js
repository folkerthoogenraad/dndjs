app.controller('RegisterController', ['$scope', '$location', '$http', function($scope, $location, $http) {

  if(window.localStorage.getItem("key")){
    $location.path('home');
  }

  $scope.canInput = true;
  $scope.username = "";
  $scope.password = "";
  $scope.realname = "";

  $scope.submit = function(){
    if($scope.username.length < 3){
      swal("Invalid username", "Username is too short!", "error");
      return;
    }
    if($scope.password.length < 3){
      swal("Invalid password", "Password is too short!", "error");
      return;
    }
    if($scope.realname.length < 3){
      swal("Invalid real name", "Real name is too short!", "error");
      return;
    }

    $scope.canInput = false;
    $http({
      method: 'POST',
      url: baseUrl+'/users?username='+$scope.username+'&password='+$scope.password+'&realname='+$scope.realname,
    }).then(function successCallback(response) {
      //Success
      // TODO maybe give a success message?
      $location.path('login');
    }, function errorCallback(response) {
      //Error
      swal("Error", "Coudn't register!", "error");
      $scope.canInput = true;
    });
  };
}]);

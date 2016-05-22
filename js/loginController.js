app.controller('LoginController', ['$scope', '$location', '$http', 'user', function($scope, $location, $http, user) {

  if(window.localStorage.getItem("key")){
    window.localStorage.removeItem("key");
  }

  $scope.canInput = true;
  $scope.username = "";
  $scope.password = "";

  $scope.submit = function(){
    if($scope.username.length < 3){
      swal("Invalid username", "Username is too short!", "error");
      return;
    }
    if($scope.password.length < 3){
      swal("Invalid password", "Password is too short!", "error");
      return;
    }
    if($scope.username == "Gunther" {
      swal("Oeeh", "My ding ding dong");
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
      console.dir(status);
      //Error
      swal("Error", "Are your login credentials correct?", "error");
      $scope.canInput = true;
    });
  };
}]);

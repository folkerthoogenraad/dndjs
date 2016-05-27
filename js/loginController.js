app.controller('LoginController', ['$scope', '$location', '$http', '$uibModal', 'user', function($scope, $location, $http, $uibModal, user) {

  if(window.localStorage.getItem("key")){
    window.localStorage.removeItem("key");
  }

  $scope.canInput = true;
  $scope.username = "";
  $scope.password = "default";
  $scope.name = "";

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

    console.log("Performing request to server...");
    $http({
      method: 'GET',
      url: baseUrl+'/token?username='+$scope.username+'&password='+$scope.password,
    }).then(function successCallback(response) {
      //Success
      console.log("Sucessfull");
      window.localStorage.setItem("key", response.data.key);
      $location.path('home');
    }, function errorCallback(response) {
      console.log("Error in obtaining from server");
      console.dir(response);
      //Error
      if(response.status == 401){
        swal("Password Required", "Please enter your password below. (aka contact developer, this is not yet implemented as you can see.)", "info");
      }
      else if(response.status == 404){
        swal({
          title:"Character name",
          text:"Enter your character name below",
          type:"input",
          showCancelButton:false,
          animation:"slide-from-top",
          inputPlaceholder: "Kurva Bliatzy"
        }, function(inputValue){
          if(inputValue === false){
            return false;
          }
          if (inputValue === "") {
            swal.showInputError("Your name can't be empty.");
            return false;
          }
          $scope.name = inputValue;
          $scope.register();
        });
      }
      else{
        swal("Error", "Login server couldn't be reached", "error");
      }
      $scope.canInput = true;
    });
  };

  $scope.register = function(){
    console.log("Registering...");
    $scope.canInput = false;
    $http({
      method: 'POST',
      url: baseUrl+'/users?username='+$scope.username+'&password='+$scope.password+'&realname='+$scope.name,
    }).then(function successCallback(response) {
      //Success
      // TODO maybe give a success message?
      console.log("Done!");
      $scope.submit();
    }, function errorCallback(response) {
      //Error
      swal("Error", "Coudn't register!", "error");
      $scope.canInput = true;
    });
  };
}]);

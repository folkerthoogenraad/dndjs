app.controller('HomeController', ['$scope', '$location', '$http', 'user', function($scope, $location, $http, user) {
  //TODO validate key!
  if(!window.localStorage.getItem("key")){
    $location.path('login');
    return;
  }

  $scope.name = "MISSINGNO";

  //Request user information
  $http({
    method: 'GET',
    url: baseUrl+'/user?key='+window.localStorage.getItem("key"),
  }).then(function successCallback(response) {
    //Success
    $scope.name = response.data.name;
  }, function errorCallback(response) {
    //Error
    swal("Error", "Failed to fetch user info", "error", function(){
      $location.path('home');
      $scope.$apply();
    });
  });

  $scope.inventory = function(){
    $location.path('inventory');
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

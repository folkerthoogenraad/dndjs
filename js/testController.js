app.controller('TestController', function($scope) {
  console.log("The test controller is active");
  $scope.callback = function(){
    console.log("Even the callback is working");
  };
});

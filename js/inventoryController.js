
app.controller('InventoryController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.items = [];
  $scope.gold = 124;

  $scope.getWeightSum = function(){
    var sum = 0;
    $scope.items.forEach(function(item){
      sum += item.weight;
    });
    return sum;
  };

  $scope.getMoneySum = function(){
    var sum = 0;
    $scope.items.forEach(function(item){
      sum += item.value;
    });
    return sum;
  };

  $scope.sortItems = function(){
    $scope.items.sort(function(a,b){
      if (a.name < b.name)
        return -1;
      else if (a.name > b.name)
        return 1;
      else
        return 0;
    });
  };

  $scope.back = function(){
    $location.path('home');
  };

  $http({
    method: 'GET',
    url: baseUrl+'/user?key='+window.localStorage.getItem("key"),
  }).then(function successCallback(response) {
    //Success
    $scope.name = response.data.name;
    $scope.gold = response.data.gold;
  }, function errorCallback(response) {
    //Error
    swal("Error", "Failed to fetch user info", "error");
  });

  $http({
    method: 'GET',
    url: baseUrl+'/inventory?key='+window.localStorage.getItem("key"),
  }).then(function successCallback(response) {
    //Success
    $scope.items = response.data;
  }, function errorCallback(response) {
    //Error
    swal("Error", "Couldn't fetch items", "error");
  });

}]);

var app = angular.module('DungeonsAndDragonsApp', ['ngRoute', 'ui.bootstrap']);
var baseUrl = null; //'http://localhost:8080'

app.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/home', {
    templateUrl: 'partials/home.html'
  }).when('/inventory', {
    templateUrl: 'partials/inventory.html'
  }).when('/login', {
    templateUrl: 'partials/login.html'
  }).when('/register', {
    templateUrl: 'partials/register.html'
  }).otherwise({
    redirectTo: '/login'
  });
}]);

app.factory('user', function(){
  return {
    name:'unkown',
  };
});

app.controller('MasterController', ['$scope', '$location', '$interval', '$http', function($scope, $location, $interval, $http) {
  if(baseUrl === null){
    baseUrl = 'http://' + $location.host() + ':8080';
  }

  var promise = $interval(function(){
    if(window.localStorage.getItem("key")){
      $http({
        method: 'GET',
        url: baseUrl+'/dungeon/loot?key='+window.localStorage.getItem("key"),
      }).then(function successCallback(response) {
        //Success

      }, function errorCallback(response) {
        console.error("Can't obtain status info for user. Is the server offline? (" + $location.path() + ")");
        $location.path('login');
      });
    }
  }, 500);

}]);

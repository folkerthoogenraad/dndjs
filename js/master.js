var app = angular.module('DungeonsAndDragonsApp', ['ngRoute', 'ui.bootstrap']);
//if you leave this at null, it uses the same server host, but at port 8080
var baseUrl = null; //'http://localhost:8080'

app.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/home', {
    templateUrl: 'partials/home.html'
  }).when('/login', {
    templateUrl: 'partials/login.html'
  }).when('/admin', {
    templateUrl: 'partials/admin.html'
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

  //Every half a second, check if loot has dropped
  /*var promise = $interval(function(){
    if(window.localStorage.getItem("key")){
      $http({
        method: 'GET',
        url: baseUrl+'/dungeon/events?key='+window.localStorage.getItem("key"),
      }).then(function successCallback(response) {
        //Success

        var d = response.data;

      }, function errorCallback(response) {
        console.error("Can't obtain status info for user. Is the server offline? (" + $location.path() + ")");
        $location.path('login');
      });
    }
  }, 500);*/

}]);

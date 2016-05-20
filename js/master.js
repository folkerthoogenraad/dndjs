var app = angular.module('DungeonsAndDragonsApp', ['ngRoute']);
var baseUrl = 'http://192.168.178.19:8080';

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

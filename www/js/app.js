// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic','firebase']);

var fBase = null;

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    fBase = new Firebase("https://boiling-torch-9429.firebaseio.com");
  });
});

myApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })
         .state('createStack', {
             url: '/createStack',
             templateUrl: 'templates/createStack.html'
         })
         .state('stackView', {
            url: '/stackView',
            templateUrl: 'templates/stackView.html'
        })
     .state('newItem', {
         url: '/newItem',
         templateUrl: 'templates/newItem.html'
     });

    $urlRouterProvider.otherwise("/login");
});

myApp.controller("LoginController",function($scope, $firebaseAuth, $location){

    $scope.login = function(username,password) {
        var fBaseAuth = $firebaseAuth(fBase);
        fBaseAuth.$authWithPassword({
            email    : username,
            password : password
        }).then(function(authData) {

        }).catch(function(error) {
        });
 }
});
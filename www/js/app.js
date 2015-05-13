// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic','starter.controllers','starter.services','firebase'])
    .constant('FIREBASE_URL','https://boiling-torch-9429.firebaseio.com');



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

  });
});

myApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'RegistrationController'
        })
         .state('stackList', {
             url: '/stackList',
             templateUrl: 'templates/stackList.html',
             controller: 'StackListController'
         })
         .state('stackView', {
            url: '/stackView',
            templateUrl: 'templates/stackView.html',
            controller: 'StackItemController'
          })
         .state('newItem', {
            url: '/newItem',
            templateUrl: 'templates/newItem.html',
            controller: 'newItemController'
         });
    $urlRouterProvider.otherwise("/login");
});
/**
 * Created by Matt on 4/29/2015.
 */
angular.module('starter.controllers', []);

myApp.controller('CategoryController',function($scope){
    $scope.saveData = function(category){
        window.localStorage.setItem("category",category);
        return(alert(localStorage.getItem(category)));
    };

});


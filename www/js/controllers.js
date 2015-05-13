angular.module('starter.controllers', [])

 .controller('RegistrationController',
    function($scope, $location, Authentication){  //add Authentication service here

        $scope.user={};

        $scope.login = function() {
            Authentication.login($scope.user)
                .then(function(user) {
                    $location.path('/stackList');
                }).catch(function(error) {
                    alert("ERROR: " + error);
                });
        };
        $scope.register = function() {
            Authentication.register($scope.user)
             .then(function (user) {
                Authentication.login($scope.user);
                $location.path('/stackList');
            }).catch(function (error) {
                alert("ERROR: " + error);
            });
        }
    })  //RegistrationController

.controller('StackListController',function($scope, StackList,$state){
   $scope.stackId={};

   $scope.stacks = StackList.all();

   $scope.openStack = function(stackId){
       StackList.setStack(stackId);
       $state.go('stackView');
   };

   $scope.addStack = function(){
       StackList.addStack($scope.stackId);
       $state.go('stackView');
   }
    }) //StackListController


.controller('StackItemController',function($scope,StackList){
        var stackId = StackList.getStack();
        $scope.stackName= stackId.title;
        console.log("This is the stackID object that was returned, ",stackId);
})

.controller('newItemController',function($scope,StackList){
    $scope.item={
        name: "new item"
    };

    var stackId = StackList.getStack();
    $scope.stackName= stackId.title;
    console.log("This is the stackID object that was returned, ",stackId);
});



//.controller('StackListController',function($scope, $firebaseObject){
//    $scope.list = function(){}
    //    var currentMoFo = Authentication.getCurrentUser();
    //
    //    console.log("This is the MF UID:", currentMoFo.uid);
    //    if(currentMoFo) {
    //        var syncObject = $firebaseObject(fBase.child("users/" + currentMoFo.uid));   //fBaseAuth.uid
    //        syncObject.$bindTo($scope, "data");
    //    }
    //}
    //$scope.addStack = function(stackName){
    //    if(stackName !== "") {
    //        if ($scope.data.hasOwnProperty("stacks") !== true) {
    //            $scope.data.stacks = [];
    //        }
    //        $scope.data.stacks.push({title: stackName});
    //    } else{
    //        console.log("Action not completed");
    //    }
    //}
    //}); //StackListController
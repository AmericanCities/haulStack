angular.module('starter.controllers', [])

 .controller('RegistrationController',
    function($scope, $location, $ionicPopup, Authentication){  //add Authentication service here

        $scope.user={};

        $scope.login = function() {
            Authentication.login($scope.user)
                .then(function(user) {
                    $location.path('/stackList');
                }).catch(function(error) {
                    $ionicPopup.alert({
                        title: "That didn't work",
                        template: error
                    });
                });
        };
        $scope.register = function() {
            Authentication.register($scope.user)
             .then(function (user) {
                Authentication.login($scope.user);
                $location.path('/stackList');
            }).catch(function (error) {
               $ionicPopup.alert({
                   title: "That didn't work",
                   template: error
                    });
            });
        }
    })  //RegistrationController

.controller('StackListController',function($scope, StackList, $state){
   $scope.stackId={};

   $scope.stacks = StackList.all();

  // includes callback function with $state.gov
   $scope.openStack = function(stackId){
       StackList.setStack(stackId,function(){
           $state.go('stackView');
       });
   };


   $scope.addStack = function(){
       StackList.addStack($scope.stackId, function(){
           $state.go('stackView');
       });
   };
    }) //StackListController


.controller('StackItemController',function($scope,StackList, $state, ItemService,  $ionicPopup){
        var stackId = StackList.getStack();
        $scope.stackName= stackId.title;
        $scope.items = ItemService.all();

        $scope.openItem =function(itemId){
            ItemService.setItem(itemId, function(){
                $state.go('newItem')
            });
        };

        $scope.deleteStack = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete the stack?',
                template: 'Are you sure, this will delete all items in this stack'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    StackList.deleteStack(function(){
                        $state.go('stackList');
                    })
                } else {
                    console.log('stack was Deleted');
                }
            });
        };

        $scope.newItem = function(){
            ItemService.newItem(function(){
                $state.go('newItem');
            })
        };

        console.log("This is the stackID object that was returned, ",$scope.items);

    })



.controller('newItemController',function($scope, ItemService, $ionicPopup, $state, $cordovaCamera) {
        $scope.item = {
            name: "new item",
            size: ""
        };

        $scope.item = ItemService.getItem();


        $scope.addItem = function () {
            ItemService.addItem($scope.item, function () {
                $state.go('stackView');
            });
        };

        $scope.deleteItem = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete this Item?',
                template: 'Are you sure?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    ItemService.deleteItem(function () {
                        $state.go('stackView');
                    })
                } else {
                    console.log('stack was Deleted');
                }
            });
        };

        $scope.takePicture =function(){
            if (!navigator.camera){
                console.log("no Camera to take picture");
            } else {
                var cameraOptions = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 200,
                    targetHeight: 200,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
                    var pic = "data:image/jpeg;base64," + imageData;
                    $scope.item.pictureURI = pic;
                    ItemService.addPhotoToFireB(pic);
                }, function (errorText) {
                    $ionicPopup.alert({
                        title: 'A camera Error Occured',
                        template: 'The type of error was: ' + errorText
                    });
                });
            }
         };
    });
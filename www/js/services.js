/**
 * Created by Matt on 4/29/2015.
 */

angular.module('starter.services', ['firebase'])

.factory('Authentication', function($firebase, $firebaseAuth,
                                        $location, FIREBASE_URL){
    var fBase = new Firebase(FIREBASE_URL);
    var fBaseAuth =  $firebaseAuth(fBase);

    var User = function(){
        this.uid =  fBase.getAuth().uid;  //potentially change to onAuth
    };

    var myObject ={
        login: function(user){
            return fBaseAuth.$authWithPassword({
                email    : user.username,
                password : user.password
            }); //authWithPassword
        }, //login

        register: function(user){
            return fBaseAuth.$createUser({
                email    : user.username,
                password : user.password
            });
        },

        getCurrentUser: function(){
            if (fBase.getAuth()){
                return new User();
            }
        } //getCurrentUser

    };//myObject

    return myObject;

})//MyApp Factory Authentication


.factory('StackList',function($firebaseArray, Authentication, FIREBASE_URL){
    //src= https://github.com/mappmechanic/ionic-firebase/blob/master/www/js/services.js
    var fBase = new Firebase(FIREBASE_URL);
    var currentUser = Authentication.getCurrentUser();
    var stacks = $firebaseArray(fBase.child("users/" + currentUser.uid + "/stacks"));

    var stack ={};

    function getStack() {
         return stack;
    }
    function setStack(newStack,cb){
        stack = newStack;
        if (cb){
            cb();
        }
    }

     return {
        all: function () {
            return stacks;
        },
        addStack : function(newStack,cb) {
            if (newStack.title !== "") {
                console.log("got Here at least!! with stackName of",newStack.title);
                stacks.$add({
                   title: newStack.title,
                   date : Firebase.ServerValue.TIMESTAMP
                }).then(function(temp){
                    setStack(stacks[stacks.length-1]);
                    console.log("here after adding object", getStack());
                    cb();
                });
            } else {
                console.log("Action not completed");
            }
        },
         deleteStack : function(cb){
             var updatedItem = getStack().$id;
             fBase.child("users/" + currentUser.uid + "/stacks/"+ updatedItem)
                 .remove(function(error){
               if(error){
                   console.log("Error: ", error);
               }  else{
                   console.log("removed succesfully");
               }
             });
             if (cb){
               cb();
             }
             },
         setStack : setStack,
         getStack : getStack
        }
})

.factory('ItemService',function($firebaseArray,StackList, Authentication, FIREBASE_URL) {

        var fBase = new Firebase(FIREBASE_URL);
        var currentUser = Authentication.getCurrentUser();
        var currentStack={};
        var items = {};

        function setCurrentStack(){
            currentStack = StackList.getStack();
            items = $firebaseArray(fBase.child("users/" + currentUser.uid + "/stacks/"+ currentStack.$id +"/items"));
        }

        var item = {};

        function getItem() {
            return item;
        }
        function setItem(oldItem,cb) {
            item        = oldItem;
            item.status = "exists";
            if (cb) {
                cb();
            }
        }
        return {
            all: function () {
                setCurrentStack();
                return items;
            },
            addItem: function(newItem,cb) {
                if (newItem.name !== "" && newItem.size >0 && newItem.status !="exists") {
                    console.log("got Here at least!! with an item Name of",newItem.name);
                    items.$add({
                        name : newItem.name,
                        size : newItem.size,
                        date : Firebase.ServerValue.TIMESTAMP
                    }).then(function(temp){
                        cb();
                    })
                } else if (newItem.status == "exists") {
                    var updatedItem = newItem.$id;
                    var indexedItem = items.$indexFor(updatedItem);
                    items.$save(indexedItem).then(function(){
                       if (cb){
                        cb();}
                    })
                } else{
                    console.log("Action not completed");
                }
            },
            newItem :function(cb){
                item.name="new item";
                item.size="0";
                if (cb){
                    cb();}
            },
            deleteItem : function(cb){
                var updatedItem = getItem().$id;
                fBase.child("users/" + currentUser.uid + "/stacks/"+ currentStack.$id +"/items/" + updatedItem)
                    .remove(function(error){
                        if(error){
                            console.log("Error: ", error);
                        }  else{
                            console.log("removed succesfully");
                        }
                    });
                if (cb){
                    cb();
                }
            },
            setItem :setItem,
            getItem :getItem
        }
    })

    .factory('Camera', ['$q', function($q) {

        return {
            getPicture: function(options) {
                var q = $q.defer();

                navigator.camera.getPicture(function(result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }]);
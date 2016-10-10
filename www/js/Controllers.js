/**
 * Created by 192.168.3.21 on 9/12/2015.
 */

angular.module('starter')
  .constant("FirebaseURL", "https://saylanionlinequrbani.firebaseio.com")

  .controller('LoginController', function($scope, authService, Items){



    $scope.login= authService.showLoginDialog;
    $scope.logout= authService.doLogout;


  })

.controller('HomeController', function($scope, authService, $state, Items){

    $scope.uid =authService.currentUser.uid;
    console.log($scope.uid);


    $scope.cuser =authService.currentUser.details;
    console.log("from HOME  "+ $scope.cuser);

    $scope.userName = authService.currentUser.details.facebook.displayName;

    $scope.gotoOQ = function(){
      $state.go("online-qurbani")
    };


    $scope.logout= authService.doLogout;
  })
.controller('OnlineQurbaniController', function($scope, authService, $state){
    $scope.gotoOQ = function(val){
      $state.go("qurbaniForm",{type:val})
    };
  })

  .controller('QurbaniFormController', function($scope, authService,$ionicPopup,ItemsAsObj,FirebaseURL, Items, $stateParams){
    var ref = new Firebase(FirebaseURL);
    var users = ItemsAsObj;
    var user = authService.currentUser;
    $scope.condition = $stateParams.type;

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Online Qurbani',
        template: 'Your qurbani now reserved. Thanks for trustin us.'
      });
      alertPopup.then(function(res) {
        console.log('proposal submeted');
      });
    };
      $scope.submitQurbani = function (data) {

        /*for (var i=0; i < users.length; i++){
          if (users[i].uid == authService.currentUser.uid){
            ref.update({
              "data": data
            });
            break;
          }
        }*/

        ref.child("users").child(user.uid).once("value", function(snapshot){
          if(!snapshot.exists() || !snapshot.child("uid").exists()){
            users[authData.auth.uid] = user;
            users.$save().then(function(ref) {
              id = ref.key();
              console.log("added record with id " + id);
            });
          } else {
            console.log("This user already exists in firebase");
          }
        });


        console.log(data);
        $scope.showAlert();
      };

  })

.service('authService',function($firebaseArray, $state, FirebaseURL, ItemsAsObj){
    var ref = new Firebase(FirebaseURL);
    var users = ItemsAsObj;
    var id = null;
    var user = {
      uid : null,
      details : null
    };

    this.currentUser = user;
    this.objID = id;
    this.showLoginDialog = function () {
      ref.authWithOAuthPopup("facebook", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {

          user.uid = authData.auth.uid;
          user.details = authData;



          console.log("Authenticated successfully with payload:", authData);
          console.log("data saved:", user);
          $state.go('home');

          ref.child("users").child(user.uid).once("value", function(snapshot){
            if(!snapshot.exists() || !snapshot.child("uid").exists()){
              users[authData.auth.uid] = user;
              users.$save().then(function(ref) {
                id = ref.key();
                console.log("added record with id " + id);
              });
            } else {
              console.log("This user already exists in firebase");
            }
          });
        }
      })
    };

    this.doLogout = function(){
      if(user.uid == null){
        alert("Please login First");
        return;
      }
      ref.unauth();
      user.uid = null;
      console.log('unauth successfully.');
      $state.go('login')
    };



  });


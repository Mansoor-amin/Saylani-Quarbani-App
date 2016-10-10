// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase'])

.run(function($ionicPlatform) {
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
})



  .factory("Items", function($firebaseArray) {
    var itemsRef = new Firebase("https://saylanionlinequrbani.firebaseio.com/users");
    return $firebaseArray(itemsRef);
  })
  .factory("ItemsAsObj", function($firebaseObject) {
    var itemsRef = new Firebase("https://saylanionlinequrbani.firebaseio.com/users");
    return $firebaseObject(itemsRef);
  })




.config(function ($stateProvider,$urlRouterProvider){
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .state('online-qurbani', {
        url: '/online-qurbani',
        templateUrl: 'views/online-qurbani.html',
        controller: 'OnlineQurbaniController'
      })
      .state('qurbaniForm', {
        url: '/qurbaniForm/::type',
        templateUrl: 'views/qurbaniForm.html',
        controller: 'QurbaniFormController'
      });
      /*.state('tabs', {
        url: '/tabs',
        /!*abstract: true,*!/
        templateUrl: 'views/tabs.html'
      })*/




    $urlRouterProvider.otherwise("/login")
  });

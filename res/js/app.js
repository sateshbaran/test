console.log("app.js workingg");
var app = angular.module("project",['ngRoute']);
app.config(["$routeProvider",function($routeProvider){
  $routeProvider
  .when("/games",{
    templateUrl : "views/videogames.html",
  })
  .when("/consoles",{
    templateUrl : "views/consoles.html"
  })
  .when("/acc",{
    templateUrl : "views/acc.html"
  })
  .when("/addItem#/",{
    templateUrl : "views/addGame.html",

  })
  .when("/addg",{
    templateUrl : "views/addGame.html",
    controller : "games",

  })
  .when("/addc",{
    templateUrl : "views/addConsole.html",
    controller : "consoles",
  })
  .when("/adda",{
    templateUrl : "views/addAcc.html",
    controller : "accs",
  })
}]);

app.controller('games',['$scope',function($scope){
  console.log('games controller executed');
  retrieveGames();
  retrieveGenres();
}]);
app.controller('consoles',['$scope',function($scope){
  console.log('consoles controller executed');
  retrieveConsoles();
}]);
app.controller('accs',['$scope',function($scope){
  console.log('accs controller executed');
  retrieveAccs();
}]);

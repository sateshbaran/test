$(document).ready(function () {
  console.log("main.js is working");
});
function retrieveGames(){
    console.log("Getting all Games");
    $.get("/test/games", processAllGames, "json"); // When AJAX request is completed successfully, the proccessAllCountries function will be executed with the data as a parameter

}
function retrieveGenres(){
  console.log("getting all genres");
  $.get("/test/genres",processAllGenres, "json");
}
function retrieveConsoles(){
    console.log("Getting all Consoles");
    $.get("/test/consoles", processAllConsoles, "json"); // When AJAX request is completed successfully, the proccessAllCountries function will be executed with the data as a parameter
    console.log();
}
function retrieveAccs(){
    console.log("Getting all Accessories");
    $.get("/test/accs", processAllAccs, "json"); // When AJAX request is completed successfully, the proccessAllCountries function will be executed with the data as a parameter
}

function processAllGames(records){
  console.log(records);
  var str="<tr><th>ID</th><th>Name</th><th>Genre</th><th>Price</th><th>Quantity</th></tr>";
  records.forEach(function(game){
    str += "<tr>";
    str += "<td>" + game.id + "</td>";
    str += "<td>" + game.name + "</td>";
    str += "<td>" + game.genre + "</td>";
    str += "<td>" + game.price + "</td>";
    str += "<td>" + game.quantity + "</td>";
    str += "</tr>";
  });
  $("#gamesTable").html(str);
}
function processAllGenres(records){
  console.log(records);
  records.forEach(function(g){
    var str = "<option value='"+ g.genre + "'>" + g.genre + "</option>";
    $("#genre").append(str);
  });
}
function processAllConsoles(records){
  console.log(records);
  var str="<tr><th>ID</th><th>Name</th><th>Price</th><th>Quantity</th></tr>";
  records.forEach(function(con){
    str += "<tr>";
    str += "<td>" + con.id + "</td>";
    str += "<td>" + con.name + "</td>";
    str += "<td>" + con.price + "</td>";
    str += "<td>" + con.quantity + "</td>";
    str += "</tr>";
  });
  $("#consTable").html(str);

}
function processAllAccs(records){
  var str="<tr><th>ID</th><th>Name</th><th>Price</th><th>Quantity</th></tr>";
  records.forEach(function(acc){
      str += "<tr>";
      str += "<td>" + acc.id + "</td>";
      str += "<td>" + acc.name + "</td>";
      str += "<td>" + acc.price + "</td>";
      str += "<td>" + acc.quantity + "</td>";
      str += "</tr>";
  });
  $("#accsTable").html(str);
}
function valSignUp(){
  var f = document.forms["signup"]["firstname"];
  var l = document.forms["signup"]["lastname"];
  var e = document.forms["signup"]["email"];
  var u = document.forms["signup"]["username"];
  var p = document.forms["signup"]["password"];
  var ut = document.forms["signup"]["usertype"];

  if (f.value == "") {
    swal({
      title: "Firstname needed!",
      text: "Please Enter your Firstname.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    f.focus();
    return false;
  }
  else if (l.value == "") {
    swal({
      title: "Lastname needed!",
      text: "Please Enter your Lastname.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    l.focus();
    return false;
  }
  else if (e.value == "") {
    swal({
      title: "Email needed!",
      text: "Please Enter a valid Email.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    e.focus();
    return false;
  }
  else if (u.value == "") {
    swal({
      title: "Username needed!",
      text: "Please Enter your Username.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    u.focus();
    return false;
  }
  else if (p.value == "") {
    swal({
      title: "Password needed!",
      text: "Please Enter your Password.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    p.focus();
    return false;
  }
  else if (ut.value == 9) {
    swal({
      title: "Usertype needed!",
      text: "Please Enter your Usertype.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    ut.focus();
    return false;
  }
  else{
    addUser();
    return false;
  }
}
function addUser(){
  var f = $("#firstname").val();
  var l = $("#lastname").val();
  var e = $("#email").val();
  var u = $("#username").val();
  var p = $("#password").val();
  var ut = $("#usertype").val();
  console.log("Recieved %s %s  %s  %s %s and %s ",f,l,e,u,p,ut);
  var data = {
    'firstname' : f,
    'lastname' : l,
    'email' : e,
    'username' : u,
    'password' : p,
    'usertype' : ut
  };
  $.post("/test/addUser",data,function(res){
    console.log(res);
    if(res.id > 0)
      swal("Success","User Added","success");
    else {
      swal("Error","User could not be added","error");
    }
  },"json");
}
function valLogin() {
  var u = document.forms["login"]["username"];
  var p = document.forms["login"]["password"];
  var ut = document.forms["login"]["usertype"];

  if (u.value == "") {
    swal({
      title: "Username needed!",
      text: "Please Enter your Username.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    u.focus();
    return false;
  }
  else if (p.value == "") {
    swal({
      title: "Password needed!",
      text: "Please Enter your Password.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    p.focus();
    return false;
  }
  else if (ut.value == 9) {
    swal({
      title: "Usertype needed!",
      text: "Please Enter your Usertype.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    ut.focus();
    return false;
  }
  else{
    var data = {
      'username' : u.value,
      'password' : p.value,
      'usertype' : ut.value,
    };
    $.post("/test/login",data,function(res){
      console.log(res);
      if(res.id > 0)
        swal("Success","Loggin in","success");
      else {
        swal("Invalid User","Failed to login","error");
      }
    },"json");
    return false;
  }
}

function valAddGame() {
  var n = document.forms["addGame"]["gname"];
  var g = document.forms["addGame"]["genre"];
  var p = document.forms["addGame"]["gprice"];
  var q = document.forms["addGame"]["gquantity"];

  if (n.value == "") {
    swal({
      title: "Name needed!",
      text: "Please Enter a Name.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    n.focus();
    return false;
  }
  else if (g.value == "") {
    swal({
      title: "Genre needed!",
      text: "Please Enter a genre.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    g.focus();
    return false;
  }
  else if (p.value == "") {
    swal({
      title: "Price needed!",
      text: "Please Enter the price.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    p.focus();
    return false;
  }
  else if (q.value == "") {
    swal({
      title: "Price needed!",
      text: "Please Enter the quantity.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    q.focus();
    return false;
  }
  else{
    addGame();
    return false;
  }
}

function addGame(){
  var n = $("#gname").val();
  var g = $("#genre").val();
  var p = $("#gprice").val();
  var q = $("#gquantity").val();
  console.log("Recieved %s %s  %s and %s ",n,g,p,q);
  var data = {
    'name' : n,
    'genre' : g,
    'price' : p,
    'quantity' : q
  };
  $.post("/test/addGame",data,function(res){
    console.log(res);
    if(res.id > 0)
      swal("Success","Game Added","success");
    retrieveGames();
  },"json");
}

function valAddConsole() {
  var n = document.forms["addConsole"]["cname"];
  var p = document.forms["addConsole"]["cprice"];
  var q = document.forms["addConsole"]["cquantity"];

  if (n.value == "") {
    swal({
      title: "Name needed!",
      text: "Please Enter a Name.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    n.focus();
    return false;
  }
  else if (p.value == "") {
    swal({
      title: "Price needed!",
      text: "Please Enter the price.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    p.focus();
    return false;
  }
  else if (q.value == "") {
    swal({
      title: "Price needed!",
      text: "Please Enter the quantity.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    q.focus();
    return false;
  }
  else{
    addConsole();
    return false;
  }
}

function addConsole(){
  var n = $("#cname").val();
  var p = $("#cprice").val();
  var q = $("#cquantity").val();
  console.log("Recieved %s %s and %s ",n,p,q);
  var data = {
    'name' : n,
    'price' : p,
    'quantity' : q
  };
  $.post("/test/addConsole",data,function(res){
    console.log(res);
    if(res.id > 0)
      swal("Success","Console Added","success");
    retrieveConsoles();
  },"json");
}

function valAddAcc() {
  var n = document.forms["addAcc"]["aname"];
  var p = document.forms["addAcc"]["aprice"];
  var q = document.forms["addAcc"]["aquantity"];

  if (n.value == "") {
    swal({
      title: "Name needed!",
      text: "Please Enter a Name.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    n.focus();
    return false;
  }
  else if (p.value == "") {
    swal({
      title: "Price needed!",
      text: "Please Enter the price.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    p.focus();
    return false;
  }
  else if (q.value == "") {
    swal({
      title: "Price needed!",
      text: "Please Enter the quantity.",
      type: "warning",
      confirmButtonColor: "#76C2AF",
      confirmButtonText: "OK",
      closeOnConfirm: false

    });
    q.focus();
    return false;
  }
  else{
    addAcc();
    return false;
  }
}
function addAcc(){
  var n = $("#aname").val();
  var p = $("#aprice").val();
  var q = $("#aquantity").val();
  console.log("Recieved %s %s and %s ",n,p,q);
  var data = {
    'name' : n,
    'price' : p,
    'quantity' : q
  };
  $.post("/test/addAcc",data,function(res){
    console.log(res);
    if(res.id > 0)
      swal("Success","Accessory Added","success");
    retrieveAccs();
  },"json");
}

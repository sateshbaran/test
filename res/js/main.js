$(document).ready(function () {
  console.log("main.js is working");
});
function retrieveGames(){
    console.log("Getting all Games");
    $.get("/test/games", processAllGames, "json"); // When AJAX request is completed successfully, the proccessAllCountries function will be executed with the data as a parameter
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
    var str="";
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
  records.forEach(function(con){
      var str="";
      str += "<tr>";
      str += "<td>" + con.id + "</td>";
      str += "<td>" + con.name + "</td>";
      str += "<td>" + con.price + "</td>";
      str += "<td>" + con.quantity + "</td>";
      str += "</tr>";
      $("#consTable").html(str);
  });
}
function processAllAccs(records){
  records.forEach(function(acc){
      var str="";
      str += "<tr>";
      str += "<td>" + acc.id + "</td>";
      str += "<td>" + acc.name + "</td>";
      str += "<td>" + acc.price + "</td>";
      str += "<td>" + acc.quantity + "</td>";
      str += "</tr>";
      $("#accsTable").html(str);
  });
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
  else return true;
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
  return false;
}

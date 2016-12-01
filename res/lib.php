<?php

function connectDB(){
  try{
    $db = new mysqli("us-cdbr-iron-east-04.cleardb.net","bee11f4e479155","07064880","heroku_f154ae20fe9c574");//Change later
    if($db == NULL && $db->connect_errno > 0)return NULL;
    return $db;
  }catch(Exception $e){}
  return NULL;
}

function getAllUsers(){
  $sql ="SELECT * FROM `users`";
  try{
    $db = connectDB();
    if($db != NULL){
      $arr = array();
      $res = $db->query($sql);
      while($res && $row = $res->fetch_assoc()){
        array_push($arr, $row);
      }
      $db->close();
      return $arr;
    }
  }catch(Exception $e){}
    return NULL;
}
function getAllGames(){
  $sql ="SELECT * FROM `games`";
  try{
    $db = connectDB();
    if($db != NULL){
      $arr = array();
      $res = $db->query($sql);
      while($res && $row = $res->fetch_assoc()){
        array_push($arr, $row);
      }
      $db->close();
      return $arr;
    }
  }catch(Exception $e){}
    return NULL;
}
function getAllGenres(){
  $sql="SELECT DISTINCT `genre` FROM `games`";
  try {
    $db = connectDB();
    if($db != NULL){
      $arr = array();
      $res = $db->query($sql);
      while($res && $row = $res->fetch_assoc()){
        array_push($arr, $row);
      }
      $db->close();
      return $arr;
    }
  } catch (Exception $e) {}
    return NULL;
}
function getAllConsoles(){
  $sql ="SELECT * FROM `consoles`";
  try{
    $db = connectDB();
    if($db != NULL){
      $arr = array();
      $res = $db->query($sql);
      while($res && $row = $res->fetch_assoc()){
        array_push($arr, $row);
      }
      $db->close();
      return $arr;
    }
  }catch(Exception $e){}
    return NULL;
}
function getAllAccs(){
  $sql ="SELECT * FROM `accessories`";
  try{
    $db = connectDB();
    if($db != NULL){
      $arr = array();
      $res = $db->query($sql);
      while($res && $row = $res->fetch_assoc()){
        array_push($arr, $row);
      }
      $db->close();
      return $arr;
    }
  }catch(Exception $e){}
    return NULL;
}

function addGame($n, $g, $p, $q){
  $sql = "INSERT INTO  `games`(`name`,`genre`,`price`,`quantity`) VALUES('$n','$g','$p','$q');";
  $id = -1;
  try {
    $db = connectDB();
    if($db != NULL){
      $res = $db->query($sql);
      if($res && $db->insert_id > 0){
        $id = $db->insert_id;
      }
      $db->close();
    }
  } catch (Exception $e) {}
  return $id;
}
function checkLogin($u, $p, $ut){
  $pw = sha1($p);
  $sql = "SELECT * FROM `users` WHERE `username` = '$u' AND `password` = '$pw' AND `usertype` = '$ut';";
  $db = connectDB();
  $res = $db->query($sql);
  $row = $res->fetch_assoc();
  if($row['id']> 0){
    $_SESSION['id'] = $row['id'];
    $_SESSION['username'] = $row['username'];
    $_SESSION['usertype'] = $row['usertype'];
    return TRUE;
  }
  else{
    return FALSE;
  }
}

?>

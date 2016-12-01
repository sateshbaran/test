<?php
session_start();
$_SESSION['id'] = -1;
$_SESSION['username'] = -1;
$_SESSION['usertype'] = -1;
require 'res/app.php';
$app->run();
?>

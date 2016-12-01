<?php
require 'vendor/autoload.php';
include 'lib.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Slim\App as App;
use \Slim\Container as Container;
use Slim\Views\PhpRenderer as PhpRenderer;
use Slim\Views\Twig as Twig;

$configuration = [
		'settings' => [
				'displayErrorDetails' => true,
		],
		'renderer' => new Slim\Views\Twig("./templates")
];
$container = new Container($configuration);
$app = new App($container);

// Uses a PHP templating system to display HTML when requested
$app->get('/', function (Request $request, Response $response) {
	return $this->renderer->render($response, "/home.phtml");
});

$app->get('/about', function (Request $request, Response $response) {
	return $this->renderer->render($response, "about.phtml");
});

$app->get('/signup', function (Request $request, Response $response) {
	return $this->renderer->render($response, "signup.phtml");
});
$app->post('/addUser', function (Request $request, Response $response) {
	$post = $request->getParsedBody();
	$f = $post['firstname'];
	$l = $post['lastname'];
	$e = $post['email'];
	$u = $post['username'];
	$p = $post['password'];
	$ut= $post['usertype'];

	$res = addUser($f, $l, $e, $u, $p, $ut);
	// print ($res);
	if ($res > 0){
		$response = $response->withStatus(201);
		$response = $response->withJson(array( "id" => $res));
	} else {
		$response = $response->withJson(array( "id" => $res));
	}
	return $response;
});

$app->post('/login', function (Request $request, Response $response) {
	$post = $request->getParsedBody();
	$u = $post['username'];
	$p = $post['password'];
	$ut= $post['usertype'];

  $res = login($u, $p, $ut);
  if($res > 0){
		$response = $response->withStatus(201);
		$response = $response->withJson(array("id"=> $res));
	}
	else {
			//$response = $response->withStatus(400);
			$response = $response->withJson(array("id"=> $res));
	}
	return $response;

});
$app->get('/user', function (Request $request, Response $response) {
	if(!isset($_SESSION['username'])){
		return $response->withStatus(302)->withHeader('Location', '/test');
	}
	else echo $_SESSION['username'];
});

//Add item
$app->get('/addItem', function (Request $request, Response $response) {
	if(checkLogin() > 0){
		//Change
		return $this->renderer->render($response, "addItem.phtml");
	}
	else {
		return $this->renderer->render($response, "addItem.phtml");
	}
});

//Adding items
$app->get('/games', function (Request $request, Response $response) {
	$games = getAllGames();
	$response = $response->withJson($games);
	return $response;
});
$app->get('/genres', function (Request $request, Response $response) {
	$games = getAllGenres();
	$response = $response->withJson($games);
	return $response;
});
$app->post('/addGame', function (Request $request, Response $response) {
	$post = $request->getParsedBody();
	$n = $post['name'];
	$g = $post['genre'];
	$p = $post['price'];
	$q = $post['quantity'];
	$res = addGame($n, $g, $p, $q);
	// print ($res);
	if ($res > 0){
		$response = $response->withStatus(201);
		$response = $response->withJson(array( "id" => $res));
	} else {
		$response = $response->withStatus(400);
	}
	return $response;
});

$app->get('/consoles', function (Request $request, Response $response) {
	$consoles = getAllConsoles();
	$response = $response->withJson($consoles);
	return $response;
});
$app->post('/addConsole', function (Request $request, Response $response) {
	$post = $request->getParsedBody();
	$n = $post['name'];
	$p = $post['price'];
	$q = $post['quantity'];

	$res = addConsole($n, $p, $q);

	if ($res > 0){
		$response = $response->withStatus(201);
		$response = $response->withJson(array( "id" => $res));
	} else {
		$response = $response->withStatus(400);
	}
	return $response;
});
$app->get('/accs', function (Request $request, Response $response) {
	$accs = getAllAccs();
	$response = $response->withJson($accs);
	return $response;
});
$app->post('/addAcc', function (Request $request, Response $response) {
	$post = $request->getParsedBody();
	$n = $post['name'];
	$p = $post['price'];
	$q = $post['quantity'];

	$res = addAcc($n, $p, $q);

	if ($res > 0){
		$response = $response->withStatus(201);
		$response = $response->withJson(array( "id" => $res));
	} else {
		$response = $response->withStatus(400);
	}
	return $response;
});

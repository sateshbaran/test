<?php
session_start();
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

$app->post('/user', function (Request $request, Response $response) {
	if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['usertype'])){
	  $u = $_POST['username'];
	  $p = $_POST['password'];
	  $ut = $_POST['usertype'];

	  $c = checkLogin($u, $p, $ut);
	  if($c == FALSE){
	    return $response->withStatus(302)->withHeader('Location', '/test');
		}
		else {
				return $this->renderer->render($response, "user.phtml");
		}
	}
});
$app->get('/user', function (Request $request, Response $response) {
	if(!isset($_SESSION['username'])){
		return $response->withStatus(302)->withHeader('Location', '/test');
	}
	else echo "string";
});

//Add item
$app->get('/addItem', function (Request $request, Response $response) {
	return $this->renderer->render($response, "addItem.phtml");
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
$app->get('/accs', function (Request $request, Response $response) {
	$accs = getAllAccs();
	$response = $response->withJson($accs);
	return $response;
});

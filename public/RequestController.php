<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

var_dump($_POST);

require_once('../app/Rover.php');
require_once('../app/Plateau.php');
require_once('../app/controllers/ExplorationController.php');

// Plateau top right coordinates
$plateauInput = [5, 5];

// Initialise a new Pleateau object
$plateau = new Plateau($plateauInput[0], $plateauInput[1]);

// Rovers start, direction and move values
$rovers = [
    ['x' => 1, 'y' => 2, 'direction' => 'N', 'moves' => 'MRMLMMRM'],
    ['x' => 4, 'y' => 5, 'direction' => 'E', 'moves' => 'MRMLMMRLM'],
    ['x' => 0, 'y' => 0, 'direction' => 'N', 'moves' => 'MRMLMMRLM'],
    ['x' => 1, 'y' => 3, 'direction' => 'N', 'moves' => 'XRLMMTYI'],
];

$result = ExplorationController::moveRovers($plateau, $rovers);

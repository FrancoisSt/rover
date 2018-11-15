<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('../app/Rover.php');
require_once('../app/Plateau.php');
require_once('../app/controllers/ExplorationController.php');

ExplorationController::moveRovers();

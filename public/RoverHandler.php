<?php

// Require files
require_once('../app/Rover.php');
require_once('../app/Plateau.php');
require_once('../app/controllers/ExplorationController.php');

// Check if posted input exists
if (isset($_POST['maxX']) && isset($_POST['maxY']) && isset($_POST['results'])) {

    // Declare veriables
    $maxX = $_POST['maxX'];
    $maxY = $_POST['maxY'];
    $rovers = $_POST['results'];
    
    // Initialise a new Pleateau object
    $plateau = new Plateau($maxX, $maxY);
    
    // Calculate the final coordinates
    $result = ExplorationController::moveRovers($plateau, $rovers);
    
    // Encode and return the new coordinates
    echo json_encode($result);
} else {
    // Return an error message
    echo json_encode("error");
}

<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('../app/Rover.php');
require_once('../app/Plateau.php');


$plateauInput = [50, 50];

$roversInput = [
    ['x' => 1, 'y' => 2, 'direction' => 'N', 'moves' => 'MRMLMMRM'],
    ['x' => 4, 'y' => 5, 'direction' => 'N', 'moves' => 'MRMLMMRLM'],
    ['x' => 10, 'y' => 11, 'direction' => 'N', 'moves' => 'MRMLMMRLM'],
];

$plateau = new Plateau($plateauInput[0], $plateauInput[1]);

$positions = [];

foreach ($roversInput as $index => $input) {
    $rover = new Rover($input['x'], $input['y'], $input['direction'], $input['moves']);
    echo "Rover $index Start: " . $rover->x . " " . $rover->y . " " . $rover->direction . "<br><br>";

    $moves = str_split($input['moves']);
    for ($i=0; $i < count($moves); $i++) {
        if ($moves[$i] == 'L' || $moves[$i] == 'R') {
            $rover->turn($moves[$i]);
        } elseif ($moves[$i] == 'M') {
            $rover->move($plateau->xEnd, $plateau->yEnd, $positions);
        }
    }
    array_push($positions, $rover->x . $rover->y);
    echo "Rover $index End: " . $rover->x . " " . $rover->y . " " . $rover->direction . "<br><br>";
}

<?php

class ExplorationController
{
    /**
     * Handle the rover movement
     *
     **/
    public static function moveRovers(Plateau $plateau, array $rovers)
    {
        // Initialise an empty array to hold parked rover coordinates
        // Used to prevent collisions when moving rovers
        $parkedRovers = [];

        // Initialise an empty array to hold results that satisfy challenge result
        // requirements as well as unit test expected result format
        $result = [];

        // Create a new Rover object for each of the rovers in the $rovers array
        // Once created, move rover according to 'moves' instructions
        foreach ($rovers as $input) {

            $rover = new Rover($input['x'], $input['y'], $input['direction'], $input['moves']);

            $moves = str_split($input['moves']);

            for ($i = 0; $i < count($moves); $i++) {
                if ($moves[$i] == 'L' || $moves[$i] == 'R') {
                    $rover->turn($moves[$i]);
                } elseif ($moves[$i] == 'M') {
                    $move = $rover->move($plateau->xEnd, $plateau->yEnd, $parkedRovers);
                }
            }

            // Add results to the two arrays
            array_push($parkedRovers, $rover->x . $rover->y);
            array_push($result, $rover->x . ' ' . $rover->y . ' ' . $rover->direction);
        }
        return $result;
    }
}

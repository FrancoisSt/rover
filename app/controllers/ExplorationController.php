<?php

class ExplorationController
{
    public static function moveRovers()
    {
        $plateauInput = [5, 5];

        $roversInput = [
            ['x' => 1, 'y' => 2, 'direction' => 'N', 'moves' => 'MRMLMMRM'],
            ['x' => 4, 'y' => 5, 'direction' => 'N', 'moves' => 'MRMLMMRLM'],
            ['x' => 0, 'y' => 0, 'direction' => 'N', 'moves' => 'MRMLMMRLM'],
        ];

        $plateau = new Plateau($plateauInput[0], $plateauInput[1]);

        $parkedRovers = [];

        foreach ($roversInput as $index => $input) {
            $rover = new Rover($input['x'], $input['y'], $input['direction'], $input['moves']);

            echo "Rover \"$index\" Start: " . $rover->x . " " . $rover->y . " " . $rover->direction . "<br><br>";

            $moves = str_split($input['moves']);

            for ($i=0; $i < count($moves); $i++) {
                if ($moves[$i] == 'L' || $moves[$i] == 'R') {
                    $rover->turn($moves[$i]);
                } elseif ($moves[$i] == 'M') {
                    $move = $rover->move($plateau->xEnd, $plateau->yEnd, $parkedRovers);
                }
            }
            array_push($parkedRovers, $rover->x . $rover->y);

            echo "Rover \"$index\" End: " . $rover->x . " " . $rover->y . " " . $rover->direction . "<br><br>";
        }
    }
}

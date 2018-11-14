<?php

class Rover
{
    protected $x;
    protected $y;
    protected $moves;
    protected $direction;

    /**
     * Class constructor
     *
     * When object is created, starting postition,
     * direction and moves are variables required
     *
     * @return void
     **/
    public function __construct(int $x, int $y, string $direction, string $moves)
    {
        $this->x = $x;
        $this->y = $y;
        $this->moves = $moves;
        $this->direction = $direction;
    }

    /**
     * Getter
     *
     * @return $this->property
     **/
    public function __get($property)
    {
        return $this->$property;
    }

    /**
     * Setter
     *
     * @return $this->property
     **/
    public function __set($property, $value)
    {
        return $this->$property = $value;
    }

    /**
     * Turn Rover
     *
     * @param string $direction
     * @return void
     **/
    public function turn(string $direction)
    {
        $directions = ['N', 'E', 'S', 'W'];

        if ($direction == 'L') {
            return $this->direction = $directions[array_search($this->direction, $directions) -1] ?? $directions[count($directions) - 1];
        } elseif ($direction == 'R') {
            return $this->direction = $directions[array_search($this->direction, $directions) +1] ?? $directions[0];
        }
    }

    /**
     * Move Rover
     *
     * Do not move when reaching boundary or other parked rover
     *
     * @return void
     **/
    public function move(int $xEnd, int $yEnd, array $positions)
    {
        switch ($this->direction) {
            case 'N':
                if (!in_array((string)($this->x . $this->y+1), $positions)) {
                    $this->y < $yEnd ? $this->y++ : null;
                } else {
                    return false;
                }
                break;
            case 'S':
                if (!in_array((string)($this->x . $this->y - 1), $positions)) {
                    $this->y > 0 ? $this->y-- : null;
                } else {
                    return false;
                }
                break;
            case 'E':
                if (!in_array((string)($this->x + 1 . $this->y), $positions)) {
                    $this->x < $xEnd? $this->x++ : null;
                } else {
                    return false;
                }
                break;
            case 'W':
                if (!in_array((string)($this->x - 1 . $this->y), $positions)) {
                    $this->x > 0 ? $this->x-- : null;
                } else {
                    return false;
                }
                break;
            default:
                //Do nothing
                break;
        }
    }
}

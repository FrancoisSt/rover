<?php

class Plateau
{
    protected $xEnd;
    protected $yEnd;

    /**
     * Class constructor
     *
     * When object is created, plateau grid size is required
     *
     * @return void
     **/
    public function __construct(int $xEnd, int $yEnd)
    {
        $this->xEnd = $xEnd;
        $this->yEnd = $yEnd;
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
}

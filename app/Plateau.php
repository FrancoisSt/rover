<?php

class Plateau
{
    protected $xEnd;
    protected $yEnd;

    /**
     * Class constructor
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
     **/
    public function __get($property)
    {
        return $this->$property;
    }

    /**
     * Setter
     * 
     **/
    public function __set($property, $value)
    {
        return $this->$property = $value;
    }
}

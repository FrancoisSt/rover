<?php

use PHPUnit\Framework\TestCase;

class RoverTest extends TestCase
{
    public function testEmpty()
    {
        $stack = [];
        $this->assertEmpty($stack);

        return $stack;
    }
}

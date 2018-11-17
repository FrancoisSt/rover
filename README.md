# Mars Rover Tech Challenge

## Comments By The Developer

### Core Backend Challenge Comments

My approach was to ensure that I use object oriented programming principles.
Objects were created for both the Plateau and Rover with constructors and getters and setters.

I solved the problem of turning left and right through cardinal directions by declaring them in a numbered array which I could
then increment and decrement through using the array indexes. 

Turning right from the last element or left from the first is controlled for and the array effectively loops around to allow continuous turning.

Movement is done through simply incrementing or decrementing the x and y values depending on the current direction.
Movement is also restricted by the boundaries of the plateau and by any parked rovers.

### General Comments
1. The backend challenge was completed using PHP7.
2. Input for the challenge was coded with HTML, CSS, Bootstrap and JavaScript/JQuery.
3. Although this is a backend challenge, I spent a bit of extra time on the frontend to allow easier visualisation of the result.
4. I did not use a framework like Laravel for the backend as this would have been overkill for a project with a limited scope and lifespan.

### Assumptions Made
1. Rovers are allowed to start from the same coordinates (Although I have controlled for this on the front-end).
2. Rovers are not allowed to move outside the boundaries of the plateau.
3. Rovers are not allowed to move through or onto a cell occupied by another rover that has finished its movements.
4. An empty string is allowed for the movement commands.
5. Coordinates will be positive integers (0 is allowed).
6. Movement commands will be uppercase alphabetic characters only consisting of L, R and M.
7. Direction commands will be uppercase alphabetic characters only consisting of N, E, S and W.

## Getting Started

This is a web application designed to satisfy the requirements of the challenge at:
https://code.google.com/archive/p/marsrovertechchallenge/

Steps to use:
1. Once the page loads, you will be requested to enter the top right coordinates of the plateau.
2. The plateau grid will then be drawn. 
3. Click on any grid cell to add a rover to that cell.
4. An input for each rover will appear beneath the plateau.
5. Using this input, change the starting direction (N, E, S, W) of each rover.
6. Enter movement commands for each rover by using the following keys: "R" = Turn Right, "L" = Turn Left and "M" = Move.
7. When ready, click on the "Start" button to calculate the final position of each rover and move it to that cell.
8. The starting and ending values of the rovers are displayed in the cell with the rover.
9. Click the "Reset" button to return all rovers to their starting positions.
10. If required, rovers can be removed by clicking on the "Delete" button next to their respective input rows.

### Example
Assuming a top right grid input of x = 5 and y = 5 and two rovers with the following data:

Rover 1: 
    X-Axis Start: 1 
    Y-Axis Start: 2 
    Direction: N
    Move Commands: LMLMLMLMM

Rover 2: 
    X-Axis Start: 3
    Y-Axis Start: 3 
    Direction: E
    Move Commands: MMRMMRMRRM

You could expect to see the two rovers end up in the following positions and directions:

Rover 1: 1 3 N

Rover 2: 5 1 E

### Prerequisites

A web server capable of running PHP

A modern web browser


### Installing

1. Clone to your web server folder and point your server to the "/public" folder

    An example on Apache server on Linux would be to clone to a folder called "rover" at /var/www/rover

2. Create a new apache server configuration file with the following directory settings (or the equivalent for the server you are using):
```
<Directory "/var/www/rover/public">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

3. Ensure that the "/var/www/rover" folder belongs to your web server user (Apache: www-data) and that the folder
    permissions are set to 0755

## Running the tests

Test are run with [phpunit](https://phpunit.de/)

1. Open a terminal and navigate to the "rover" root folder
2. Run the following command: phpunit tests

## Authors

* **Francois Stander**

## License

This project is licensed under the GNU GENERAL PUBLIC License - see the [LICENSE.md](LICENSE.md) file for details

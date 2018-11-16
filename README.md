# Mars Rover Tech Challenge

Backend challenge project. 

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
8. The starting and ending values of the rovers are displayed in the cell next to the rover.
9. Click the "Reset" button to return all rovers to their starting positions.
10. If required, rovers can be removed by clicking on the "Delete" button next to their respective input rows

### Prerequisites

A web server capable of running PHP
A modern web browser


### Installing

1. Clone to your web server folder and point your server to the /public folder

    An example on Apache server on Linux would be to clone to a folder called "rover" at /var/www/rover

2. Create a new apache server configuration file with the following (or the equivalent for the server you are using):

<VirtualHost *:80>
  ServerAdmin name@mail.com
  ServerName rover
  ServerAlias http://rover
  DocumentRoot "/var/www/rover/public"

    <Directory "/home/francois/www/rover/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

3. Ensure that the "/var/www/rover" folder belongs to your web server user (Apache: www-data) and that the folder
    permissions are set to 755

## Running the tests

Test are run with phpunit https://phpunit.de/

1. Open a terminal and navigate to the "rover" root folder
2. Run the following command: phpunit tests

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* **Francois Stander**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

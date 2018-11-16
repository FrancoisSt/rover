<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Sytlesheets -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

    <!-- JavaScript -->
    <script src="js/jquery-3.3.1.js"></script>
    <script src="js/bootstrap.bundle.js"></script>
    <script src="js/jquery-confirm.min.js"></script>
    <script src="js/main.js"></script>

    <title>Mars Explorer</title>
</head>

<body>
    <!-- Bootstrap Grid Container -->
    <div id="content-div" class="container">
        <div class="row">
            <div class="col-sm-12">
            <br>
                <div id="main-heading">Mars Rover Command Center</div>
                <br>
                <span id="plateau-header-text" class="hidden">Click on a square to add a rover</span>
                <br><br>

                <div id="plateau-target"><!-- JavaScript Target --></div>

                <!-- Rover Controls -->
                <div id="rover-controls" class="hidden">
                    <br><br>
                    <button type="button" class="button control-buttons hidden" id="start-button" onclick="explore()">Start</button>
                    <button type="button" class="button control-buttons hidden" id="reset-button" onclick="resetRovers()">Reset</button>
                    <br><br>

                    <!-- Rovers Table -->
                    <table id="rovers-table" class="table hidden table-dark">
                        <thead>
                            <tr>
                                <th colspan="5">Adjust The Direction and Issue Movement Commands To Each Rover (Allowed Moves: "L" = Left, "R" = Right, "M" = Move)</th>
                            </tr>
                            <tr>
                                <th>X Start</th>
                                <th>Y Start</th>
                                <th>Direction</th>
                                <th>Moves</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

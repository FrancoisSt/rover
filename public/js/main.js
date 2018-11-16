$(document).ready(function () {

    /* Prompt user for plateau size */
    initializePlateau();

    /* EVENTS */

    // Plateau cell click event
    $(document).on('click', '.cell', function (e) {
        let id = $(this).attr('id');
        if ($(this).children().length) {
            $.confirm({
                title: 'Unable To Place Rover - Space Occupied!',
                content: '<strong>You cannot place a rover on an occupied grid cell. Please select a vacant cell...</strong>',
                columnClass: 'col-md-12 col-md-offset-0',
                type: 'orange',
                typeAnimated: true,
                alignMiddle: true,
                backgroundDismiss: false,
                buttons: {
                    ok: {
                        text: 'OK',
                        btnClass: 'btn-green',
                        action: function () {
                            //
                        },
                    }
                },
            });
        } else {
            $(this).html("<img class='' src='images/rover.png' width='50px' id=" + "img" + id + "><div>" + id[0] + ' ' + id[1] + ' <span class="direction-cell-target">N</span>' + "</div>");

            $('#rovers-table').removeClass('hidden');
            $('.control-buttons').removeClass('hidden');
            $('#rovers-table tbody').append(
                `
                    <tr>
                        <td><input type="number" name="x-start" id="x-start" value="${id[0]}" class="form-control number" readonly title="This rover's starting X-Axis position"></td>
                        <td><input type="number" name="y-start" id="y-start" value="${id[1]}" class="form-control number" readonly title="This rover's starting Y-Axis position"></td>
                        <td>
                            <select name="direction" id="direction" data-id="${id}" class="form-control" title="Choose the rover's starting direction">
                                <option value="N">N</option>
                                <option value="E">E</option>
                                <option value="S">S</option>
                                <option value="W">W</option>
                            </select>
                        </td>
                        <td><input type="text" name="commands" class="form-control commands" placeholder="Enter movement commands" title="Enter movement commands 'L = Left, R = Right, M = Move'"></td>
                        <td><button type="button" id="${id}" class="btn btn-default remove-rover-button" title="Click to remove this rover">Remove</button></td>
                    </tr>
                `
            );
        }
    });

    // Rover direction change in dropdown select
    $(document).on('change', '#direction', function (e) {
        let direction = $(this).val();
        let id = $(this).attr('data-id');
        let image = $("#img" + id);
        turn(image, direction);
    });

    // Remove rover button click
    $(document).on('click', '.remove-rover-button', function (e) {
        let id = $(this).attr('id');
        $(this).parents('tr:first').remove();
        $('.cell#' + id).html("");
        if ($('#rovers-table tbody tr').length < 1) {
            $('#rovers-table').addClass('hidden');
            $('.control-buttons').addClass('hidden');
        }
    });

    // Keyup event on moves/commands input
    // Any invalid input is removed and string is converted to uppercase
    $(document).on('keyup', '.commands', function (e) {
        let str = $(this).val().trim();
        str = filterInput(str);
        $(this).val(str.toUpperCase());
    });

    /* END EVENTS */

}); // End document ready function

/* FUNCTIONS */

// Prompt the user for the top right coordinates for the plateau
function initializePlateau() {
    let content = `
        <div class="form-group">
            <label for="x">X-Axis Maximum Value</label>
            <input type="number" class="form-control" id="x" aria-describedby="xHelp" min="0" max="999999" value="0">
            <small id="xHelp" class="form-text text-muted">Please select the maximum x-axis value for the plateau grid.</small>
        </div>
        <div class="form-group">
            <label for="y">Y-Axis Maximum Value</label>
            <input type="number" class="form-control" id="y" aria-describedby="yHelp" min="0" max="999999" value="0">
            <small id="yHelp" class="form-text text-muted">Please select the maximum y-axis value for the plateau grid.</small>
        </div>
    `;
    $.confirm({
        title: 'Please select the top right coordinates for the plateau grid...',
        content: content,
        columnClass: 'col-md-10 col-md-offset-0',
        type: 'blue',
        typeAnimated: true,
        alignMiddle: true,
        backgroundDismiss: false,
        buttons: {
            ok: {
                text: 'Submit',
                btnClass: 'btn-green',
                action: function () {
                    let x = $('input#x').val();
                    let y = $('input#y').val();
                    drawPlateau(x, y);
                },
            },
            cancel: {
                text: 'Cancel',
                btnClass: 'btn-red',
                action: function () {
                    location.reload();
                }
            }
        },
    });
}

// Draw the plateau
function drawPlateau(x, y) {
    let html = `<table border="1" id="plateau-table" width="${(x * 100) + 20}px" height="${(y * 100) + 20}px" data-max_x="${x}" data-max_y="${y}">`;
    for (let yAxis = y; yAxis >= 0; yAxis--) {
        html += `<tr>`;
        for (let xAxis = 0; xAxis <= x; xAxis++) {
            html += `<td id="${xAxis.toString() + yAxis.toString()}" class="cell" width="80px" height="80px" align="center"></td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;
    $('#plateau-target').html(html);
    $("#rover-controls").removeClass('hidden');
    $('#plateau-header-text').removeClass('hidden');
}

// Filter command/moves input
// Only allow valid moves (l, r or m)
function filterInput(str) {
    let pattern = /[^lrm]/gi;
    return str.replace(pattern, "");
}

// Start the rover moves process
function explore() {
    clearCells();
    let rovers = $('#rovers-table tbody tr');
    let results = [];
    rovers.each(function (index, rover) {
        let x = $(rover.children[0].children[0]).val();
        let y = $(rover.children[1].children[0]).val();
        let direction = $(rover.children[2].children[0]).val();
        let moves = $(rover.children[3].children[0]).val().trim();
        results.push({ x: x, y: y, direction: direction, moves: moves });
    });
    calculateRoverRoutes(results);
}

// Calculate the final locations
function calculateRoverRoutes(results) {
    let maxX = $('#plateau-table').attr('data-max_x');
    let maxY = $('#plateau-table').attr('data-max_y');
    $.ajax({
        type: "post",
        url: "RoverHandler.php",
        data: { results, maxX, maxY },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data != 'error') {
                [...data].map(function (rover) {
                    let str = rover.split(" ");
                    let direction = str[2];
                    move(rover, direction);
                });
            } else {
                $.confirm({
                    title: 'ERROR!',
                    content: 'There was a communication error with your rovers. Please resend the last transmission...',
                    columnClass: 'col-md-12 col-md-offset-0',
                    type: 'red',
                    typeAnimated: true,
                    alignMiddle: true,
                    backgroundDismiss: false,
                    buttons: {
                        ok: {
                            text: 'OK',
                            btnClass: 'btn-green',
                            action: function () {
                                //
                            },
                        }
                    },
                });
            }
        }
    });
}

// Reset all rovers to their starting positions
function resetRovers() {
    clearCells();
    let rovers = $('#rovers-table tbody tr');
    rovers.each(function (index, rover) {
        let x = $(rover.children[0].children[0]).val();
        let y = $(rover.children[1].children[0]).val();
        let direction = $(rover.children[2].children[0]).val();
        let str = x + " " + y + " " + direction;
        move(str, direction);
    });
}

// Move the rovers to their final positions
function move(str, direction) {
    var elements = str.split(" ");

    $('#' + elements[0] + elements[1]).html("<img src='images/rover.png' width='50px' id=" + "img" + elements[0] + elements[1] + "><div>" + str + "</div>");

    let img = $("#img" + elements[0].toString() + elements[1].toString());

    turn(img, direction);
}

// Turn the rover to its correct heading
function turn(img, direction) {
    switch (direction) {
        case 'E':
            img.siblings().find('.direction-cell-target').text('E');
            img.addClass('east');
            img.removeClass('south');
            img.removeClass('west');
            break;
        case 'S':
            img.siblings().find('.direction-cell-target').text('S');
            img.addClass('south');
            img.removeClass('east');
            img.removeClass('west');
            break;
        case 'W':
            img.siblings().find('.direction-cell-target').text('W');
            img.addClass('west');
            img.removeClass('south');
            img.removeClass('east');
            break;
        default:
            img.siblings().find('.direction-cell-target').text('N');
            img.removeClass('west');
            img.removeClass('south');
            img.removeClass('east');
            break;
    }
}

// Clear all rovers from the plateau
function clearCells() {
    $('.cell').html("");
}

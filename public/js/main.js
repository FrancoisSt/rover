$(document).ready(function () {
    console.log('ready');

    //resetRovers();

    $('#input-form').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function (data) {
                console.log(data);
            }
        });
    });

    $(document).on('click', '.cell', function (e) {
        let id = $(this).attr('id');
        $('#input-form').append(`<div class="input-group new-rover-line-item"><label for="x-start">Start X</label>
        <input type="number" name="x-start" id="x-start" min="0" max="<?php echo $plateau->xEnd ?>" value="${id[0]}" class="number" readonly>
        <label for="y-start">Start Y</label>
        <input type="number" name="y-start" id="y-start" min="0" max="<?php echo $plateau->yEnd ?>" value="${id[1]}" class="number" readonly>
        <label for="direction">Direction</label>
        <select name="direction" id="direction" data-id="${id}">
        <option value="N" selected>N</option>
        <option value="E">E</option>
        <option value="S">S</option>
        <option value="W">W</option>
        </select>
        <label for="commands">commands</label>
        <input type="text" name="commands" class="commands" placeholder="Enter movement commands" title="Enter movement commands 'L = Left, R = Right, M = Move'">
        <span><button type="button" class="remove-rover-button">Remove</button></span>
        </div>`);

        $(this).html("<img class='' src='images/rover.jpg' width='50px' id=" + "img" + id + "><div>" + id + "</div>");

    });

    $(document).on('change', '#direction', function (e) {
        let direction = $(this).val();
        let id = $(this).attr('data-id');
        let image = $("#img" + id);
        turn(image, direction);
    });

    $(document).on('click', '.remove-rover-button', function (e) {
        $(this).parents('.input-group').remove();
    });

    $(document).on('keyup', '.commands', function (e) {
        let str = $(this).val().trim();
        str = filterInput(str);
        $(this).val(str.toUpperCase());
    });

    function filterInput(str) {
        let pattern = /[^lrm]/gi;
        return str.replace(pattern, "");
    }

    function explore() {

        clearCells();

    <? php foreach($result as $rover) { ?>
        var str = "<?php echo $rover ?>";
            var direction = "<?php echo substr(str_replace(" ", "", $rover), 2, 1) ?>";
            move(str, direction);
    <? php 
} ?>
}

    function resetRovers() {

        clearCells();

    <? php foreach($rovers as $roverStart) { ?>
        var str = "<?php echo ($roverStart['x'] . ' ' . $roverStart['y'] . ' ' . $roverStart['direction']); ?>";
            var direction = "<?php echo $roverStart['direction'] ?>";
            move(str, direction);
    <? php 
} ?>
}

    function move(str, direction) {
        var elements = str.split(" ");
        var cell = document.getElementById(elements[0] + elements[1]);

        cell.innerHTML = "<img src='images/rover.jpg' width='50px' id=" + "img" + elements[0] + elements[1] + "><div>" + str + "</div>";

        let img = document.getElementById("img" + elements[0] + elements[1]);

        turn(img, direction);

    }

    function turn(img, direction) {
        switch (direction) {
            case 'E':
                img.addClass('east');
                img.removeClass('south');
                img.removeClass('west');
                break;
            case 'S':
                img.addClass('south');
                img.removeClass('east');
                img.removeClass('west');
                break;
            case 'W':
                img.addClass('west');
                img.removeClass('south');
                img.removeClass('east');
                break;
            default:
                img.removeClass('west');
                img.removeClass('south');
                img.removeClass('east');
                break;
        }
    }

    function clearCells() {
        $('.cell').html("");
    }
});

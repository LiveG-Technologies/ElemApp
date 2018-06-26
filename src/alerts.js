var alertCallback = function() {};
var inputEnterCallback = function() {};

function alert(content, title = "") {
    if (title == "") {
        $("#alert").html(`
            <p>` + content + `</p>
            <div class="right">
                <button onclick="closeAlert();">OK</button>
            </div>
        `);
    } else {
        $("#alert").html(`
            <h2>` + title + `</h2>
            <p>` + content + `</p>
            <div class="right">
                <button onclick="closeAlert();">OK</button>
            </div>
        `);
    }

    $("#alert").fadeIn(500);
    $("#menuBackground").fadeIn(1000);
}

function prompt(content, title = "", callback = function() {}) {
    alertCallback = callback;

    if (title == "") {
        $("#alert").html(`
            <p>` + content + `</p>
            <input id="alertInput"></input>
            <div class="right">
                <button onclick="closeAlert(1);">OK</button>
            </div>
        `);
    } else {
        $("#alert").html(`
            <h2>` + title + `</h2>
            <p>` + content + `</p>
            <input id="alertInput"></input>
            <div class="right">
                <button onclick="closeAlert(1);">OK</button>
            </div>
        `);
    }

    $("#alert").fadeIn(500);
    $("#menuBackground").fadeIn(1000);

    $("#alertInput").focus();

    $("#alertInput").keypress(function (e) {
        if (e.keyCode == "13") {
            closeAlert(1);
        }
    });
}

function yesNo(content, title = "", callback = function() {}) {
    alertCallback = callback;

    if (title == "") {
        $("#alert").html(`
            <p>` + content + `</p>
            <div class="right">
                <button onclick="closeAlert(2);" class="secondary">No</button><button onclick="closeAlert(3);">Yes</button>
            </div>
        `);
    } else {
        $("#alert").html(`
            <h2>` + title + `</h2>
            <p>` + content + `</p>
            <div class="right">
                <button onclick="closeAlert(2);" class="secondary">No</button><button onclick="closeAlert(3);">Yes</button>
            </div>
        `);
    }

    $("#alert").fadeIn(500);
    $("#menuBackground").fadeIn(1000);
}

function badYesNo(content, title = "", callback = function() {}) {
    alertCallback = callback;

    if (title == "") {
        $("#alert").html(`
            <p>` + content + `</p>
            <div class="right">
                <button onclick="closeAlert(3);" class="bad">Yes</button><button onclick="closeAlert(2);">No</button>
            </div>
        `);
    } else {
        $("#alert").html(`
            <h2>` + title + `</h2>
            <p>` + content + `</p>
            <div class="right">
                <button onclick="closeAlert(3);" class="bad">Yes</button><button onclick="closeAlert(2);">No</button>
            </div>
        `);
    }

    $("#alert").fadeIn(500);
    $("#menuBackground").fadeIn(1000);
}

function closeAlert(doCallback = 0) {
    inputEnterCallback = function() {};

    $("#alert").fadeOut(500);
    $("#menuBackground").fadeOut(1000);

    setTimeout(function() {
        if (doCallback == 1) {
            alertCallback($("#alertInput").val());
        } else if (doCallback == 2) {
            alertCallback(false);
        } else if (doCallback == 3) {
            alertCallback(true);
        }
    }, 1000);
}
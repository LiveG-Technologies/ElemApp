// TODO: Implement an app structure for JSON that uses the model for dashboard.js.

var element = "";
var properties = [];
var properties = [
    {
        type: "text",
        property: "Name",
        value: "Home"
    }
];

function updateProperties() {
    var items;
    var panel = "";

    if (properties == []) {items = screenProperties;} else {items = properties;}

    for (var i = 0; i < items.length; i++) {
        if (items[i].type == "label") {
            panel += `<p>` + items[i].value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `</p>`;
        } else if (items[i].type == "text") {
            panel += items[i].property.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `:<br><input value="` + items[i].value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `" class="property"></input>`;
        }
    }

    $("#properties").html(panel);
}

var leftPanelShow = false;
var rightPanelShow = false;
var propertiesShow = true;

$("#app").niceScroll({
    cursorborder: "0",
    autohidemode: false
});

setInterval(function() {
    if (!leftPanelShow && $(window).width() <= 800) {
        $(".panel.left").fadeOut(500);
    } else {
        $(".panel.left").fadeIn(500);
    }

    if (!rightPanelShow && $(window).width() <= 800) {
        $(".panel.right").fadeOut(500);
    } else {
        $(".panel.right").fadeIn(500);
    }

    if ((leftPanelShow || rightPanelShow) && $(window).width() <= 800) {
        $("#menuBackground").fadeIn(1000);
        $("#panelClose").fadeIn(1000);

        if (propertiesShow) {
            $("#propertiesTitle").show();
            $("#properties").show();
            $("#properties").removeClass("half");

            $("#elementsTitle").hide();
            $("#elements").hide();
            $("#elements").removeClass("half");
        } else {
            $("#elementsTitle").show();
            $("#elements").show();
            $("#elements").removeClass("half");

            $("#propertiesTitle").hide();
            $("#properties").hide();
            $("#properties").removeClass("half");
        }
    } else {
        if ($("#menu").css("left") == "75vw") {$("#menuBackground").fadeOut(1000);}

        $("#panelClose").fadeOut(1000);

        $("#elementsTitle").show();
        $("#elements").show();
        $("#elements").addClass("half");

        $("#propertiesTitle").show();
        $("#properties").show();
        $("#properties").addClass("half");
    }
}, 100);

updateProperties();
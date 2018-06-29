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

function setTextProperty(key, value) {
    firebase.database().ref(key).set(value);
}

function updateProperties() {
    var items;
    var panel = "";

    var elementPath = ""
    if (element != "") {elementPath = "/elements/" + element}

    firebase.database().ref("users/" + currentUid + "/apps/" + getURLParameter("app") + "/defaultScreen").once("value").then(function (screen) {
        firebase.database().ref("users/" + currentUid + "/apps/" + getURLParameter("app") + "/screens/" + screen.val() + elementPath + "/properties").once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                if (childData.type == "label") {
                    panel += `<p>` + childData.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `</p>`;
                } else if (childData.type == "text") {
                    panel += childData.property.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `:<br><input oninput="setTextProperty('users/' + currentUid + '/apps/' + getURLParameter('app') + '/screens/' + '` + screen.val() + `' + '` + elementPath + `' + '/properties/` + childKey + `/value', $(this).val());" value="` + childData.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `" class="property"></input>`;
                }
            });

            $("#properties").html(panel);
        });
    });
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


firebase.auth().onAuthStateChanged(function(user) {
    // Checks if user auth state has changed.
    if (user) {updateProperties();}
});
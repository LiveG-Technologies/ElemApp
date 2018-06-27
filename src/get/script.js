var currentUid = null;
var appData = {};
var appDev = "";

function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function closeMenu() {
    $("#menu").css("left", "-75vw");
    $("#menuBackground").fadeOut(1000);
    closeAlert();
}

if (getURLParameter("app") == null || getURLParameter("dev") == null)  {
    window.location.href = "../index.html";
} else {
    firebase.database().ref("users/" + getURLParameter("dev") + "/apps/" + getURLParameter("app")).once("value").then(function(snapshot) {
        appData = snapshot.val();

        $(".appName").text(appData.name);
    });

    firebase.database().ref("users/" + getURLParameter("dev") + "/_settings/name").once("value").then(function(snapshot) {
        appDev = snapshot.val();

        $(".appDev").text(appDev);
    });
}
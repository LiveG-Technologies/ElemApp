var currentUid = null;

function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function change(user) {
    if (user && user.uid != null) {
        // Signed in.
        $(".myuid").text(currentUid);
        
        firebase.database().ref("users/" + user.uid + "/_settings/name").on("value", function(snapshot) {
            if (getURLParameter("test") != "true") {
                $(".myname").text(snapshot.val());
            }
        });
    } else {
        // Signed out.
        $(".myuid").text("null");

        if (getURLParameter("test") != "true") {
            window.location.href = "../../signin.html";
        }
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    // Checks if user auth state has changed.
    if (user) {currentUid = user.uid;} else {currentUid = null;}

    change(user);
});

function signOut() {
    firebase.auth().signOut();
}

function checkScroll() {
    if ($(this).scrollTop() > 100) {
        $("header").css("background-color", "rgb(100, 122, 255)");
    } else {
        $("header").css("background-color", "transparent");
    }
}

$(window).scroll(checkScroll);

function openMenu() {
    $("#menu").css("left", "0");
    $("#menuBackground").fadeIn(1000);
}

function closeMenu() {
    $("#menu").css("left", "-75vw");
    $("#menuBackground").fadeOut(1000);
}
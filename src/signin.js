document.getElementById("notsupported").style.display = "none";

function change(user) {
    if (typeof(Storage) !== "undefined") {
        if (user && user.uid != currentUid) {
            // Sign in operation.
            window.location.href = "user/index.html";
        } else {
            // Sign out operation.
            document.getElementById("signIn").style.display = "unset";
            document.getElementById("signUp").style.display = "none";
        }
    } else {
        alert("Sorry! You will not be able to use your ElemApp account on this device as it does not support HTML5 web storage.");
    }
}

var currentUid = null;
var signingUp = false;

firebase.auth().onAuthStateChanged(function(user) {
    // Checks if user auth state has changed.
    if (!signingUp) {
        change(user);
    } else {
        firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/_settings/name").set(document.getElementById("name").value).then(function() {
            window.location.href = "user/index.html";
        });
    }
});

function checkFields() {
    if (document.getElementById("user").value != "" && document.getElementById("pass").value != "") {
        return true;
    } else {
        document.getElementById("error").innerHTML = "Oops! You have not filled out all of the required fields.";
        return false;
    }
}

function checkUsername() {
    if (document.getElementById("name").value != "") {
        return true;
    } else {
        document.getElementById("error").innerHTML = "Oops! You have not filled out all of the required fields.";
        return false;
    }
}

function signIn() {
    document.getElementById("error").innerHTML = "";

    if (checkFields()) {
        firebase.auth().signInWithEmailAndPassword(document.getElementById("user").value, document.getElementById("pass").value).catch(function(error) {
            document.getElementById("error").innerHTML = "Oops! " + error.message.replace(/email/g, "e-mail").replace(/E-mail/g, "E-mail");
        });
    }
}

function signOutBefore() {
    document.getElementById("error").innerHTML = "";

    if (checkFields()) {
        document.getElementById("signIn").style.display = "none";
        document.getElementById("signUp").style.display = "unset";
    }
}

function signUp() {
    document.getElementById("error").innerHTML = "";

    if (checkUsername()) {
        firebase.auth().createUserWithEmailAndPassword(document.getElementById("user").value, document.getElementById("pass").value).then(function() {signingUp = true;}).catch(function(error) {
            document.getElementById("error").innerHTML = "Oops! " + error.message.replace(/email/g, "e-mail").replace(/E-mail/g, "E-mail");
        });
    }
}

function signOut() {
    document.getElementById("error").innerHTML = "";
    firebase.auth().signOut().catch(function(error) {
        document.getElementById("error").innerHTML = "Oops! Something went wrong on our side. Try again soon!";
    });
}

function reset() {
    document.getElementById("signIn").style.display = "unset";
    document.getElementById("signUp").style.display = "none";
}

var input = document.getElementById("pass");

input.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (event.keyCode === 13) {
        signIn();
    }
});

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
function addApp() {
    firebase.database().ref("users/" + currentUid + "/apps").push().set({
        name: "Test App",
        data: {}
    });
}

function deleteApp(key) {
    firebase.database().ref("users/" + currentUid + "/apps/" + key).set(null);
}

firebase.auth().onAuthStateChanged(function(user) {
    // Checks if user auth state has changed.
    if (user) {
        firebase.database().ref("users/" + currentUid + "/apps").on("value", function(snapshot) {
            if (snapshot.val() == null) {
                $("#apps").html(`
                    <div class="center">
                        <h2>Let's get started with app making!</h2>
                        <p>To get started, press the plus button to make a new app.</p>
                        <p>Need help? Go <a href="help/index.html">here</a>!</p>
                    </div>
                `);
            } else {
                $("#apps").html("");

                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();

                    $("#apps").html($("#apps").html() + `
                        <div class="card inverse">
                            <h2><a href="#" class="inherit">` + childData.name.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;") + `</a></h2>
                            <div class="right">
                            <button class="bad" onclick="deleteApp('` + childKey + `');"><i class="fas fa-trash-alt"></i></button><button class="secondary">View</button><button>Edit</button>
                            </div>
                        </div>
                `);
            });
            }
        });
    }
});
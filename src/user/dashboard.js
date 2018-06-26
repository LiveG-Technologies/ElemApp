function addApp() {
    firebase.database().ref("users/" + currentUid + "/apps").push().set({
        name: "Test App",
        data: {}
    });
}

function deleteApp(key) {
    firebase.database().ref("users/" + currentUid + "/apps/" + key).set(null);
}

$(function() {
    firebase.database().ref("users/" + currentUid + "/apps").on("value", function(snapshot) {
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
    });
});
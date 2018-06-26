var apps = [
    {
        key: "0",
        name: "App Name 0",
        content: {}
    },

    {
        key: "1",
        name: "App Name 1",
        content: {}
    },

    {
        key: "2",
        name: "App Name 2",
        content: {}
    },

    {
        key: "3",
        name: "App Name 3",
        content: {}
    },

    {
        key: "4",
        name: "App Name 4",
        content: {}
    },

    {
        key: "5",
        name: "App Name 5",
        content: {}
    }
];

function deleteApp(key) {
    for (var i = 0; i < apps.length; i++) {
        if (apps[i].key == key) {
            console.log(key);
            apps.splice(i, 1);
        }
    }

    setApps();
}

function setApps() {
    $("#apps").html("");

    for (var i = 0; i < apps.length; i++) {
        $("#apps").html($("#apps").html() + `
            <div class="card inverse">
                <h2><a href="#" class="inherit">` + apps[i].name.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;") + `</a></h2>
                <div class="right">
                <button class="bad" onclick="deleteApp('` + apps[i].key + `');"><i class="fas fa-trash-alt"></i></button><button class="secondary">View</button><button>Edit</button>
                </div>
            </div>
        `);
    }
}

setApps();
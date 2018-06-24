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
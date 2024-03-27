function myFunction() {
    // Get the snackbar DIV
    var div = document.getElementById("snackbar");

    // Add the "show" class to DIV
    div.classList.add("show");

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        div.classList.remove("show");
    }, 3000);
}

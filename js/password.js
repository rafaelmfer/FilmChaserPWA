const showBtn = document.querySelector("#show-btn");

showBtn.addEventListener("click", () => {
    const psswd = document.getElementById("psswd");

    if (psswd.type === "password") {
        psswd.type = "text";
        showBtn.innerHTML = "Hide";
    } else {
        psswd.type = "password";
        showBtn.innerHTML = "Show";
    }
});

try {
    const showBtn2 = document.querySelector("#show-btn2");

    showBtn2.addEventListener("click", () => {
        const psswd2 = document.getElementById("psswd2");

        if (psswd2.type === "password") {
            psswd2.type = "text";
            showBtn2.innerHTML = "Hide";
        } else {
            psswd2.type = "password";
            showBtn2.innerHTML = "Show";
        }
    });
} catch (err) {}

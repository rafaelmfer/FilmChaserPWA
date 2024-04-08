"use strict";

import { logout } from "./auth.js";
import { startLogoutTimer, setupListenerOnScreen } from "./common.js";

// Logout function
function logoutUser() {
    console.log("You have been logged out due to inactivity.");

    logout(() => {
        window.location.href = "signin.html";
    });
}

setupListenerOnScreen();

// Start the timer when the page is loaded
startLogoutTimer(300000, logoutUser); // 5 minutes = 300000 milliseconds

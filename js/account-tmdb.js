"use strict";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const approved = urlParams.get("approved");
const requestToken = urlParams.get("request_token");

let sessionId;
let accountId;

function createSessionAndGetAccountId() {
    if (approved) {
        theMovieDb.authentication.generateSession(
            { request_token: requestToken },
            successSession,
            errorCB
        );
    } else {
        theMovieDb.authentication.generateToken(successToken, errorCB);
    }
}

function successToken(data) {
    console.log("Result successToken: ", JSON.parse(data));

    theMovieDb.authentication.askPermissions(
        {
            token: JSON.parse(data).request_token,
            redirect_to: "http://127.0.0.1:5500/html/my-list-page.html",
        },
        {},
        errorCB
    );
}

function successSession(data) {
    console.log("Result successSession: ", JSON.parse(data));
    sessionId = JSON.parse(data).session_id;

    theMovieDb.account.getInformation(
        { session_id: sessionId },
        successAccount,
        errorCB
    );
}

function successAccount(data) {
    console.log("Result successAccount: ", JSON.parse(data));
}

function errorCB(data) {
    console.log("Error callback: " + data);
}

export { createSessionAndGetAccountId, sessionId, accountId };

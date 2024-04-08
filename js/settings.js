"use strict";

import { checkSession } from "./auth.js";
import { getInfoDb } from "./firestore.js";
import { networkInfo } from "./common.js";

networkInfo();

const user = await checkSession();
let documentId = user.uid;
let documentDbPath = `users/${documentId}`;

const userDoc = await getInfoDb(documentDbPath);
document.getElementById("userName").innerHTML = userDoc.name;
document.getElementById("userPicture").src =
  userDoc.profile_photo ||
  "../resources/imgs/Placeholder/Placeholder_actor.png";
// document.querySelector(".user-profile").src =
//   userDoc.profile_photo || "../resources/imgs/Placeholder/Placeholder_actor.png";

To make it work, create a file called `local_properties.js` without quotes inside the main directory of the project.
Add these lines inside the file:

```
// TMDb API
const API_KEY_TMDB = "PUT YOUR API KEY HERE";
const ACCESS_TOKEN_TMDB = "PUT YOUR ACCESS TOKEN HERE";

const ACCOUNT_ID = "PUT YOUR ACCOUNT ID HERE";
const SESSION_ID = "PUT YOUR SESSION ID HERE";

export { API_KEY_TMDB, ACCESS_TOKEN_TMDB, ACCOUNT_ID, SESSION_ID };
```

Then replace the text between the double quotes with your own values for the variables above.
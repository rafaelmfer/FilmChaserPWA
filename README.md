# FilmChaser PWA
## Progressive Web App for Movie Enthusiasts

FilmChaser emerges as a must-have app for cinephiles, facilitating effortless management of watched and upcoming movies and TV shows, fostering connections with friends for shared viewing experiences, and delivering personalized recommendations for enhanced enjoyment.

**Screens**
<table>  
    <th>Home Desktop</th>
    <th>Home Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Home%20Desktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Home%20Mobile.png"/>
        </td>
    </tr>
</table>

<table>  
    <th>Series Desktop</th>
    <th>Series Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Series%20Desktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Series%20Mobile.png"/>
        </td>
    </tr>
</table>

<table>  
    <th>Friends Desktop</th>
    <th>Friends Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Friends%20Desktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Friends%20Mobile.png"/>
        </td>
    </tr>
</table>

<table>  
    <th>Upcoming Desktop</th>
    <th>Upcoming Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Upcoming%20Desktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Upcoming%20Mobile.png"/>
        </td>
    </tr>
</table>

<table>  
    <th>Completed Desktop</th>
    <th>Completed Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Completed%20Desktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/FilmChaserPWA/blob/main/screenshots/Completed%20Mobile.png"/>
        </td>
    </tr>
</table>

## Quick Start
1. Create a file called `local_properties.js` inside the main directory of the project.
2. Create a free account on the [TMDB API](https://developer.themoviedb.org/docs/getting-started) to obtain your API KEY.
3. Add these lines inside the `local_properties.js` file:

```javascript
// TMDb API
const API_KEY_TMDB = "PUT YOUR API KEY HERE";
const ACCESS_TOKEN_TMDB = "PUT YOUR ACCESS TOKEN HERE";

const ACCOUNT_ID = "PUT YOUR ACCOUNT ID HERE";
const SESSION_ID = "PUT YOUR SESSION ID HERE";

export { API_KEY_TMDB, ACCESS_TOKEN_TMDB, ACCOUNT_ID, SESSION_ID };
```
4. Replace `"PUT YOUR ... HERE"` with your own values from TMDb.

That's it! You're ready to explore and enjoy FilmChaser.

## Base Project

- **IDE**: Visual Studio Code
- **Languages**: JavaScript, HTML, CSS

## API

The app utilizes the TMDB API for movie and TV show data, and some endpoints to fetch the streaming service data from JustWatch.
TMDB's API Documentation: https://developer.themoviedb.org/reference/intro/getting-started

## Design

The design follows progressive web app principles for a seamless user experience.



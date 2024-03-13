import { firebase } from "./firebase-config.js";
import {
    getFirestore,
    getDocs,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    onSnapshot,
    query,
    where,
    arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// Firestore reference
const firestore = getFirestore(firebase);

// Data Class Model for converters
class Movie {
    constructor(data, completed) {
        this.id = data.id;
        this.media_type = "movie";
        this.title = data.title;
        this.overview = data.overview;
        this.release_date = data.release_date;
        this.poster_path = data.poster_path;
        this.vote_average = data.vote_average;
        this.completed = completed;
    }
    toString() {
        let str = "";
        str += `Movie: ${this.title}\n`;
        str += `Release Date: ${this.release_date}\n`;
        str += `Rating: ${this.vote_average}/10\n`;
        str += `Overview:\n${this.overview}`;
        return str;
    }
}

class TvShow {
    constructor(data, completed) {
        this.id = data.id;
        this.media_type = "tv";
        this.name = data.name;
        this.overview = data.overview;
        this.first_air_date = data.first_air_date;
        this.poster_path = data.poster_path;
        this.vote_average = data.vote_average;
        this.completed = completed;
        this.seasons = new TvShowSeasons(data.seasons);
    }
    toString() {
        let str = "";
        str += `Show: ${this.name}\n`;
        str += `Release Date: ${this.first_air_date}\n`;
        str += `Rating: ${this.vote_average}/10\n`;
        str += `Overview:\n${this.overview}`;

        return str;
    }
}

class TvShowSeasons {
    constructor(seasons) {
        return seasons.map((season) => ({
            name: season.name,
            season_number: season.season_number,
            episodes: this.generateEpisodes(season.episode_count),
            episodes_count: season.episode_count,
        }));
    }

    generateEpisodes(episodeCount) {
        const episodes = [];
        for (let number = 1; number <= episodeCount; number++) {
            // watched set to false
            episodes.push(new TvShowEpisodes(number, false));
        }
        return episodes;
    }
}

class TvShowEpisodes {
    constructor(episode_number, watched) {
        this.episode_number = episode_number;
        this.watched = watched;
    }
}

// Firestore data converters ==============================================
const movieConverter = {
    toFirestore: (movie) => {
        return {
            id: movie.id,
            media_type: "movie",
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            completed: movie.completed,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Movie(
            data.id,
            data.media_type,
            data.title,
            data.overview,
            data.release_date,
            data.poster_path,
            data.vote_average,
            data.completed
        );
    },
};

const tvShowConverter = {
    toFirestore: (tvShow) => {
        return {
            id: tvShow.id,
            media_type: "tv",
            name: tvShow.name,
            overview: tvShow.overview,
            first_air_date: tvShow.first_air_date,
            poster_path: tvShow.poster_path,
            vote_average: tvShow.vote_average,
            completed: tvShow.completed,
            // seasons: tvShow.seasons.map((season) => ({
            //     name: season.name,
            //     season_number: season.season_number,
            //     episodes: season.episodes.map((episode) => ({
            //         episode_number: episode.episode_number,
            //         watched: episode.watched,
            //     })),
            //     episodes_count: season.episodes_count,
            // })),
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        // const seasons = data.seasons.map((season) => ({
        //     season_number: season.season_number,
        //     episodes: season.episodes.map((episode) => ({
        //         episode_number: episode.episode_number,
        //         watched: episode.watched,
        //     })),
        //     episodes_count: season.episodes_count,
        // }));
        // data.seasons = seasons;
        return new TvShow(data, data.completed);
    },
};

const tvShowSeasonsConverter = {
    toFirestore: (season) => {
        return {
            name: season.name,
            season_number: season.season_number,
            episodes_count: season.episodes_count,
            // episodes: season.episodes.map((episode) => ({
            //     episode_number: episode.episode_number,
            //     watched: episode.watched,
            // })),
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const season = {
            name: data.name,
            season_number: data.season_number,
            episodes_count: data.episodes_count,
            // episodes: data.episodes.map((episode) => ({
            //     episode_number: episode.episode_number,
            //     watched: episode.watched,
            // }))
        };
        return new TvShowSeasons(season);
    },
};

const tvShowEpisodesConverter = {
    toFirestore: (episode) => {
        return {
            episode_number: episode.episode_number,
            watched: episode.watched,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const episode = new TvShowEpisodes(data.episode_number, data.watched);
        return episode;
    },
};

// Functions CRUD =============================================================
// Functions C ====================================================

/**
 * Create New Document or Overwrite Document in Firestore
 *
 * @param {location} string - the location of the document you want to create/update
 * @param {object} object - The object that will be added as a document in the database
 *
 * saveInfoDb(`users`, documentId, object);
 * -> creates a new document with an ID and in the users collection with the all the data of the object inside
 */
async function saveInfoDb(location, id, object) {
    const reference = doc(firestore, location, id);

    try {
        await setDoc(reference, object);
        console.log("object saved to Firestore.");
    } catch (error) {
        console.error(error);
    }
}

/**
 * Create New Movie Document in Firestore
 *
 * @param {location} string - the location of the document you want to create/update
 * @param {id} number - The movie's ID on TMDb that will be the name of the document
 * @param {object} object - object that you will be saving
 * @param {completed} boolean - if true, it means that the user has already seen this movie
 *
 * saveMovieInDb([`users/${documentId}/watchlist`], movieId, movieDetails)
 * This would add 'movieDetails' under `users/{userId}/watchlist/movieId`.
 */
async function saveMovieInDb(location, id, object, completed) {
    const reference = doc(firestore, location, id).withConverter(
        movieConverter
    );

    let movie = new Movie(object, completed);
    try {
        await setDoc(reference, movie);
        console.log("object saved to Firestore.");
    } catch (error) {
        console.error(error);
    }
}

/**
 * Create New TV Show Document in Firestore in one single Document
 *
 * @param {location} string - the location of the document you want to create/update
 * @param {id} number - The TV show's ID on TMDb that will be the name of the document
 * @param {object} object - object that you will be saving
 * @param {completed} boolean - if true, it means that the user has already seen this TV show
 *
 * saveTvShowInDb([`users/${documentId}/watchlist`], tvShowId, tvShowDetails)
 * This would add 'tvShowDetails' under `users/{userId}/watchlist/tvShowId`.
 */
async function saveTvShowInDb(location, id, object, completed) {
    const reference = doc(firestore, location, id).withConverter(
        tvShowConverter
    );

    try {
        await setDoc(reference, new TvShow(object, completed));

        console.log("Object saved to Firestore.");
    } catch (error) {
        console.error(error);
    }
}

/**
 * Create New TV Show Document in Firestore in Documents and Collections
 *
 * @param {string} location - The location of the document where the TV show will be saved.
 * @param {number} idTvShow - The TV show's ID on TMDb that will be used as part of the document path.
 * @param {object} object - The TV show object that will be saved.
 * @param {boolean} completed - A flag indicating whether the user has already seen this TV show.
 *
 * await saveTvShowInDb2(watchlistPathInFirebase, "71728", seriesDetails ,false);
 * 
 * This function adds the TV show details under the specified location in Firestore.
 * Each TV show is stored as a document under the location path, with subcollections for each season and episodes within each season.
 * The document ID for each season is set to the season number, and the document ID for each episode is set to the episode number.
 */
async function saveTvShowInDb2(location, idTvShow, object, completed) {
    // Create a new TvShow object using the provided data
    let tvShow = new TvShow(object, completed);

    try {
        let reference = doc(firestore, location, idTvShow).withConverter(
            tvShowConverter
        );
        await setDoc(reference, tvShow);
        // Iterate over each season of the TV show
        for (const season of tvShow.seasons) {
            // Create a reference to the document for the current season
            const seasonRef = doc(
                firestore,
                `${location}/${idTvShow}/seasons`,
                season.season_number.toString()
            ).withConverter(tvShowSeasonsConverter);
            // Set the document data for the current season
            await setDoc(seasonRef, season);

            // Add episodes within each season
            for (const episode of season.episodes) {
                // Create a reference to the document for the current episode within the season
                const episodeRef = doc(
                    firestore,
                    `${location}/${idTvShow}/seasons/${season.season_number}/episodes`,
                    episode.episode_number.toString()
                ).withConverter(tvShowEpisodesConverter);
                // Set the document data for the current episode
                await setDoc(episodeRef, episode);
                console.log(episode);
            }
        }
        console.log("TV show object saved to Firestore.");
    } catch (error) {
        console.error(error);
    }
}

// Functions R ====================================================
/**
 * Read a Document in Firestore
 *
 * @param {location} string - the location of the document you want to read
 *
 * getInfoDb(`users/${documentId}`)
 * This would retrieve the document under `users/${documentId}`
 *
 * @returns {object} - The object you were looking for, or null.
 */
async function getInfoDb(location) {
    const docRef = doc(firestore, location);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

/**
 * Get all Documents in a Subcollection in Firestore
 *
 * @param {function} callbackError - The callback function to execute if an error occurs during listening for changes.
 *                                    This function will receive the error object as an argument.
 */
async function getAllDocsInSubcollection(location, callbackError) {
    let reference = collection(firestore, location);

    let result = [];
    try {
        const querySnapshot = await getDocs(reference);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            result.push(doc.data());
        });
        console.log("All docs got it from Firestore.");

        return result;
    } catch (error) {
        console.error(error);
        callbackError(error);
    }
}

/**
 * Retrieve all Documents in a Collection in Firestore based on a Query.
 *
 * @param {string} location - The path to the location of the collection.
 * @param {string} property - The field to query on.
 * @param {string} operator - The operator to query with (e.g., "<", 
"<=", "==", ">", ">=", "!=", "array-contains", "array-contains-any", "in", "not-in").
 * @param {any} value - The value to compare against.
 * @param {function} callbackSuccess - The callback function to execute when the data is successfully retrieved.
 *                                      This function will receive an array containing all matching documents.
 * @param {function} callbackError - The callback function to execute if an error occurs during retrieval.
 *                                    This function will receive the error object as an argument.
 */
async function getDocsByQuery(
    location,
    property,
    operator,
    value,
    callbackError
) {
    let reference = query(
        collection(firestore, location),
        where(property, operator, value)
    );

    let result = [];
    try {
        const querySnapshot = await getDocs(reference);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            result.push(doc.data());
        });
        console.log("All docs matching query retrieved from Firestore.");

        return result;
    } catch (error) {
        console.error(error);
        callbackError(error);
    }
}

/**
 * Find a Document in a Subcollection in Firestore
 *
 * @param {location} string - the path to the subcollection
 * @param {documentId} string - the ID of the document you want to find
 *
 * findDocumentInSubcollection('users/${userId}/watchlist', '603');
 * This would search for a document with ID '603' under 'users/{userId}/watchlist'.
 *
 * @returns {object} - The object you were looking for, or null.
 */
async function findDocumentInSubcollection(location, documentId) {
    const querySnapshot = await getDocs(collection(firestore, location));
    const foundDocument = querySnapshot.docs.find(
        (doc) => doc.id === documentId
    );

    if (foundDocument) {
        console.log("Document found:", foundDocument.data());
        return foundDocument.data();
    } else {
        console.log("Document not found!");
        return null;
    }
}

/**
 * Starts listening for real-time changes to a specific document in Firestore.
 *
 * @param {string} location - The path to the location of the document (collection/folder).
 * @param {string} documentId - The ID of the document you want to listen for changes to.
 * @param {function} callbackSuccess - The callback function to execute whenever the document is changed.
 *                              This function will receive the updated data of the document as an argument.
 * @param {function} callbackError - The callback function to execute if an error occurs during listening for changes.
 *                                    This function will receive the error object as an argument.
 * @returns {function} - The function to cancel listening for changes to the document.
 *                       Call this function to stop listening for changes when necessary.
 */
async function listenToDocumentChanges(
    location,
    documentId,
    callbackSuccess,
    callbackError
) {
    // Starts listening for changes to the specified document
    const unsub = onSnapshot(
        doc(firestore, location, documentId),
        (doc) => {
            if (doc.exists()) {
                // If the document exists, calls the callback function with the updated data of the document
                callbackSuccess(doc.data());
            } else {
                console.log("No such document!");
                callbackSuccess(null);
            }
        },
        (error) => {
            // If an error occurs during listening for changes, calls the errorCallback function with the error object
            callbackError(error);
        }
    );

    // Returns the function to cancel listening for changes to the document
    // Call this function to stop listening for changes when necessary
    return unsub;
}

// Functions U ====================================================
/**
 * Update a Document in Firestore
 * @param {location} string - the location of the document you want to read
 * @param {object} object - object that you will be updating
 *
 * updateInfoDb(`users/${documentId}/watchlist/${movieId}`, { completed: false });
 * This would change the "completed" value to false from the specified watchlist item
 */
async function updateInfoDb(location, object) {
    const docRef = doc(firestore, location);

    try {
        await updateDoc(docRef, object);
        console.log("updated Firestore.");
    } catch (error) {
        console.error(error);
    }
}

/**
 * Update a Map inside Firestore
 * @param {string} location - The location of the document containing the map you want to update.
 * @param {string} key - The key of the map you want to update.
 * @param {string[]} values - An array of values to update or add to the map.
 *
 * updateMapInDb(`users/${documentId}`, 'interests.actors', ['Teste1', 'Teste2']);
 * This would update the 'actors' array inside the 'interests' map in the specified document.
 */
async function updateMapInDb(location, key, values) {
    const docRef = doc(firestore, location);
    
    try {
        // Use Firestore's update method to update the specified key within the map
        await updateDoc(docRef, {
            [key]: arrayUnion(...values)
        });
        console.log("Map updated in Firestore.");
    } catch (error) {
        console.error(error);
    }
}

// FUNCTION WORK IN PROGRESS - DONT REMOVE YET
// /**
//  * Update a Document in Firestore
//  * @param {location} string - the location of the document you want to read
//  * @param {object} object - object that you will be updating
//  *
//  * updateInfoDb(`users/${documentId}/watchlist/${movieId}`, { completed: false });
//  * This would change the "completed" value to false from the specified watchlist item
//  */
// async function updateInfoDb(location, object) {
//     const docRef = doc(firestore, location);

//     city_ref = db.collection("cities").document("DC");

//     // Atomically add a new region to the 'regions' array field.
//     await docRef.update({
//         seasons: firestore.ArrayUnion(["greater_virginia"]),
//     });

//     // Atomically remove a region from the 'regions' array field.
//     await docRef.update({ regions: firestore.ArrayRemove(["east_coast"]) });

//     try {
//         await updateDoc(docRef, object);
//         console.log("updated Firestore.");
//     } catch (error) {
//         console.error(error);
//     }
// }

// Functions D ====================================================
async function deleteInfoDb(location) {
    const docRef = doc(firestore, location);

    try {
        await deleteDoc(docRef);
        console.log("doc deleted Firestore.");
    } catch (error) {
        console.error(error);
    }
}

export {
    saveInfoDb,
    saveMovieInDb,
    saveTvShowInDb,
    saveTvShowInDb2,
    getInfoDb,
    getAllDocsInSubcollection,
    getDocsByQuery,
    findDocumentInSubcollection,
    listenToDocumentChanges,
    updateInfoDb,
    updateMapInDb,
    deleteInfoDb,
};

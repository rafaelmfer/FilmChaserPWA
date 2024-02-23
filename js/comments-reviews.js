"use strict";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

//TODO - ID here is the movie ID, this function shows the comments for the movie
// We need to make the ID dynamic so we can show the comments/reviews for any movie or series
//Also add a checker "if" it's a Movie or TV Show and then call the appropriate API endpoint
theMovieDb.movies.getReviews({ id: 76203 }, successCB, errorCB);
// theMovieDb.tvSeasons.getReviews({ id: 76203 }, successCB, errorCB);

function successCB(data) {
    console.log("Review data: ", JSON.parse(data).results[0]);

    JSON.parse(data).results.forEach(function(comments) {
        createCommentCard(comments);
    });
}

function errorCB(data) {
    console.log("Error callback: " + data);
}

function createCommentCard(comment) {
    // Create the <article> element
    var article = document.createElement('article');
    
    // Add the "film-chaser" class to <article>
    article.classList.add('film-chaser');
    
    // Create the <div> element for the comment header
    var headerDiv = document.createElement('div');
    headerDiv.classList.add('comment-header');
    article.appendChild(headerDiv);
    
    // Add the user image
    var img = document.createElement('img');
    // Placeholder if there is no image
    img.src = comment.author_details.avatar_path || 'https://via.placeholder.com/50'; 
    img.alt = 'User Image';
    img.width = 50;
    img.height = 50;
    headerDiv.appendChild(img);
    
    // Create the <div> element for comment metadata
    var metaDiv = document.createElement('div');
    metaDiv.classList.add('js-comment-meta');
    headerDiv.appendChild(metaDiv);
    
    // Add the user name
    var name = document.createElement('h3');
    name.classList.add('js-comment-person-name');
    // Using name from author_details, fallback to username if not available
    name.textContent = comment.author_details.name || comment.author_details.username;
    metaDiv.appendChild(name);
    
    // Add the comment date
    var commentDate = document.createElement('p');
    commentDate.classList.add('js-comment-date');
    commentDate.textContent = new Date(comment.created_at).toLocaleString();
    metaDiv.appendChild(commentDate);
    
    // Add the options link (three dots icon and delete option)
    var optionsLink = document.createElement('a');
    optionsLink.href = '#';
    optionsLink.textContent = 'icon 3dots delete';
    headerDiv.appendChild(optionsLink);
    
    // Create the <div> element for the stars component
    var starsDiv = document.createElement('div');
    starsDiv.textContent = 'stars component';
    article.appendChild(starsDiv);
    
    // Add the comment content
    var commentContent = document.createElement('p');
    commentContent.classList.add('js-comment-content');
    commentContent.textContent = comment.content;
    article.appendChild(commentContent);
    
    // Create the <div> element for comment actions
    var actionsDiv = document.createElement('div');
    actionsDiv.classList.add('comment-actions');
    article.appendChild(actionsDiv);
    
    // Add the "Like" button
    var likeButtonDiv = document.createElement('div');
    actionsDiv.appendChild(likeButtonDiv);
    
    var likeButton = document.createElement('a');
    likeButton.href = '#';
    likeButton.textContent = 'Heart Icon';
    likeButtonDiv.appendChild(likeButton);
    
    var likeCount = document.createElement('p');
    // Number of likes of the comment
    likeCount.textContent = comment.likesCount || 2384;
    likeButtonDiv.appendChild(likeCount);
    
    // Add the "Message" button
    var messageButtonDiv = document.createElement('div');
    actionsDiv.appendChild(messageButtonDiv);
    
    var messageButton = document.createElement('a');
    messageButton.href = '#';
    messageButton.textContent = 'Message Icon';
    messageButtonDiv.appendChild(messageButton);
    
    var messageCount = document.createElement('p');
    // Number of comments inside the comment
    messageCount.textContent = comment.messagesCount || 89;
    messageButtonDiv.appendChild(messageCount);
    
    // Add the comment card to the document
    var commentsContainer = document.getElementById('comments-container');
    commentsContainer.appendChild(article);
}

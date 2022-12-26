"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show submit form when click on "submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $submitForm.show();
  putStoriesOnPage();
  //$allStoriesList.show();
}

$navSubmit.on("click", navSubmitClick);

/** Show favorite form on click on "favorites" */

function navFavoriteClick(evt) {
  console.debug("navFavoriteClick", evt);
  hidePageComponents();
  putFavStoriesOnPage();
}

$navFavorites.on("click", navFavoriteClick);

/** Show my story form on click on "my stories" */

function navMyStoryClick(evt) {
  console.debug("navMyStoryClick", evt);
  hidePageComponents();
  putMyStoriesOnPage();
}

$navMyStories.on("click", navMyStoryClick);

/** Show user profile on click on username */

function navUserProfileClicked(evt) {
  console.debug("navUserProfileClicked", evt);
  hidePageComponents();

  $("#profile-name").text(`${currentUser.name}`);
  $("#profile-username").text(`${currentUser.username}`);
  $("#profile-create-time").text(`${currentUser.createdAt}`);
  $userProfile.show();
}

$navUserProfile.on("click", navUserProfileClicked);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);



/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

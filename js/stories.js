"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  let showStar = (currentUser!==undefined);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${getTrashHtml()}
        ${showStar? getStarHtml(story):""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Generates HTML of stories in user.favorites, and puts on page. */

function putFavStoriesOnPage() {
  console.debug("putFavStoriesOnPage");
  $favStoriesList.empty();

  if(currentUser.favorites.length===0){
    $favStoriesList.append("<h5>No favorites added!</h5>")
  }else{
    // loop through all of our stories and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favStoriesList.append($story);
    }
  }
  $favStoriesList.show();
}

/** Generates HTML of stories in user.ownStories, and puts on page. */

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $myStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  if(currentUser.ownStories.length===0){
    $myStoriesList.append("<h5>No story added by user yet!</h5>")
  }else{
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story);
      $myStoriesList.append($story);
    }
    $(".fa-trash").show();
  }
  $myStoriesList.show();
}


/** Handle submit button in submit form. */

async function submitNewStory(evt) {
  console.debug("submitNewStory", evt);
  evt.preventDefault();

  const author = $("#submit-author").val();
  const title = $("#submit-title").val();
  const url = $("#submit-url").val();

  // storyList.addStory post story to API and returns story instances
  const newStory = await storyList.addStory(currentUser, {title, author, url})
  currentUser.ownStories.push(newStory);

  $submitForm.hide();
  $submitForm.trigger("reset");

  
  getAndShowStoriesOnStart()
}

$submitForm.on("submit", submitNewStory);

/** Handle click trash can - delete user's story 
 *  
 *  
 */

 async function deleteStory(evt) {
  console.debug("deleteStory", evt);
  const storyId = evt.target.closest('li').id;
  const response = await storyList.deleteStory(currentUser, storyId);
  console.log(response);

  putMyStoriesOnPage();
}

$storiesList.on("click", ".fa-trash", deleteStory);

function getTrashHtml(){
  const html = `<i class="hidden fa fa-trash" ></i>`;
  return html;
}

/** Get star html for the story  */
function getStarHtml(story) {
  const isFav = currentUser.isFavorite(story);
  const attr = isFav? "fas fa-star":"far fa-star";
  const html = `<i class="${attr}" ></i>`;
  return html;
}
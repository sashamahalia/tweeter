
// Returns a new the html of a created element to avoid XXS
const escape =  function(str) {
  let newElement = document.createElement('div');
  newElement.appendChild(document.createTextNode(str));
  return newElement.innerHTML;
}

//sorts tweets into an array organized by newest first, then calls the renderTweets function to push them to the dom.
const loadTweets = function() {
    $.getJSON('/tweets')
    .then((result) => {
      const sorted = result.sort((a, b) => b.created_at - a.created_at); //adapted from https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
      renderTweets(sorted);
    })
    .catch(err => {
      console.log('ajax error caught');
      console.log(err);
    });
};

loadTweets();

//renders all tweets to tweet-container given an array of tweet objects
const renderTweets = function(tweets) {
   $('#tweets-container').empty();
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

//Creates an html template with variables from tweet data
const createTweetElement = function(data) {
  const { user, content, created_at } = data;
  let $tweet =
  `<article class="single-tweet">
    <header>
      <div>
        <img src="${user.avatars}" alt="avatar image">
        <h4>${escape(user.name)}</h4>
      </div>
      <h5>${escape(user.handle)}</h5>
    </header>
    <p>${escape(content.text)}</p>
    <footer>
      <p>${moment(created_at).fromNow()}</p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

const validator = function(length) {
  if (140 - length < 0) {
    //appends warning icon and error message to the new-tweet section, if conditions are met
    $('.error').empty().append('<i class="fas fa-exclamation-triangle"></i><h3>Tweet must have 140 characters or less</h3>');
    slideDown();
    return false;
  }
  if (!length) {
    $('.error').empty().append('<i class="fas fa-exclamation-triangle"></i><h3>Tweet must contain text</h3>');
    slideDown();
    return false;
  }
  return true;
};

//triggers jquery slidedown effect, and adds a class to the error message to trigger visability
const slideDown = () => {
  return $(".error").slideDown('slow', () => {
    $('.error').addClass('error-red');
  });
}

$(document).ready(function() {

  //Overrides defult form behavior, submits data to server if it passes validation
  $('form').submit(function(event) {
    event.preventDefault();
    const textLength = $('#tweet-text').val().length; 
    if (validator(textLength)) {
      const serialized = $(this).serialize()
      $.post('/tweets', serialized)
      .then((result) => {
        $('#tweet-text').val('');
        loadTweets();
      })
      .catch(err => {
        console.log('ajax error caught');
        console.log(err);
      });
    }
  });
});
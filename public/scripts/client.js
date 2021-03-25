const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const loadTweets = function() {
    $.getJSON('/tweets')
    .then((result) => {
      console.log(result);
    })
    .catch(err => {
      console.log('ajax error caught');
      console.log(err);
    });
};

loadTweets();

//renders all tweets to tweet-container given an array of tweet objects
const renderTweets = function(tweets) {
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
        <h4>${user.name}</h4>
      </div>
      <h5>${user.handle}</h5>
    </header>
    <p>${content.text}</p>
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
    return alert('Cannot send tweet, character length exceeded.');
  }
  if (!length) {
    return alert('No input, add text to send tweet');
  }
  return true;
};


$(document).ready(function() {

  renderTweets(data);

  //Overrides defult form behavior, submits data to server if it passes validation
  $('form').submit(function(event) {
    event.preventDefault();
    const textLength = $('#tweet-text').val().length; 
    if (validator(textLength)) {
      const serialized = $(this).serialize()
      console.log(serialized);
      $.post('/tweets', serialized)
      .then((result) => {
        loadTweets();
      })
      .catch(err => {
        console.log('ajax error caught');
        console.log(err);
      });
    }
  });
});
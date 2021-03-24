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

const rendTweets = function(tweets) {
  for (const tweet in tweets) {
    $('#tweets-container').append(createTweetElement(tweets[tweet]));
  }
};

const createTweetElement = function(data) {
  let $tweet =
  `<article class="single-tweet">
    <header>
      <div>
        <img src="${data.user.avatars}" alt="avatar image">
        <h4>${data.user.name}</h4>
      </div>
      <h5>${data.user.handle}</h5>
    </header>
    <p>${data.content.text}</p>
    <footer>
      <p>${data.created_at}</p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

$(document).ready(function() {

  rendTweets(data);

});
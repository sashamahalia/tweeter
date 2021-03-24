const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1616278528933
}

const createTweetElement = function() {
  const handle = $('.single-tweet header div ~ h5').html($(`<h4>${this.handle}</h4>`));
  const avatar = $('.single-tweet img').html($(`<img src="${this.avatars}" alt="avatar image">`));
  return handle, avatar;
}

// $(document).ready(createTweetElement);

const $tweet = createTweetElement(tweetData);
// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
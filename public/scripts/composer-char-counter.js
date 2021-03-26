//gets .counter html via dom traversal, then gives it the value of 140 minus the input length
const count = function() {
  $(this).siblings('.container').children('.counter').html(140 - $(this).val().length);
};

//adds class of exceeded to the counter if its char count is negative, removes the class if it's 0 or above.
const exceeds = function() {
  if ((140 - $(this).val().length) < 0) {
    $(this).siblings('.container').children('.counter').addClass('exceeded');
  } else if ((140 - $(this).val().length) >= 0) {
    $(this).siblings('.container').children('.counter').removeClass('exceeded');
  }
};


$(document).ready(function() {
  $('#tweet-text').on('input', count);
  $('#tweet-text').on('input', exceeds);
});
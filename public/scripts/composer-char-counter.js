$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    $(this).siblings('.container').children('.counter').html(140 - $(this).val().length);
    // console.log(140 - $(this).val().length);
  })
});
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$( document ).ready(function() {

  var header = $('header');
  var currentDay = $('#currentDay');
  var timeBlocks = $('.time-block');
  
  $(function () {
    // save button saves input text to localstorage
    $('.saveBtn').on ('click', function () {
      let textID = $(this).parent().attr('id');
      let textGrab = $(this).siblings('textarea');
      let data = textGrab.val();
      localStorage.setItem(textID, JSON.stringify(data));
    });

    // assigns new class depending on what time it is based on number value from element id
    for (i=0;i<timeBlocks.length;i++) {
      let idGrab = timeBlocks[i].id.toString();
      let numGrab = idGrab.match(/(\d+)/);
      var timeCompare = parseInt(numGrab[0]);
      let currentTime = parseInt(dayjs().format('H'))    

      if (timeCompare === currentTime) {
        $(timeBlocks[i]).removeClass('past');
        $(timeBlocks[i]).removeClass('future');
        $(timeBlocks[i]).addClass('present');
      } else if (timeCompare > currentTime) {
        $(timeBlocks[i]).removeClass('past');
        $(timeBlocks[i]).removeClass('present');
        $(timeBlocks[i]).addClass('future');
      } else if (timeCompare < currentTime) {
        $(timeBlocks[i]).removeClass('present');
        $(timeBlocks[i]).removeClass('future');
        $(timeBlocks[i]).addClass('past');
    }
  };

  // loops through localSotrage to grab keys and attach them to variable
  for (i=0;i<localStorage.length;i++) {
    var savedData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    //checks key name against textarea ids and changes text depending on savedData from localStorage
    $(`#${localStorage.key(i)}`).children('textarea').text(savedData);
};

  // Displays current date (ex Sunday March 26, 2023)
  currentDay.text(dayjs().format('dddd MMMM DD, YYYY'));
  header.append(currentDay);
  });

});

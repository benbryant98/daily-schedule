// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var header = $('header');
var currentDay = $('#currentDay');
var timeBlocks = $('.time-block');

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $('.saveBtn').on ('click', function () {
    let textGrab = $(this).siblings('textarea');
    console.log(textGrab.val());
    localStorage.setItem("savedText", textGrab.val());
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
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
currentDay.text(dayjs().format('dddd MMMM DD, YYYY'));
header.append(currentDay);
});

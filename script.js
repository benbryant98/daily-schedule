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
      let data = [textGrab.val(), textID];
      let prevData = JSON.parse(localStorage.getItem("savedData")) || [];
      prevData.push(data);
      console.log(prevData);
      localStorage.setItem("savedData", JSON.stringify(prevData));
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
  var savedData = JSON.parse(localStorage.getItem("savedData"));
  console.log(savedData[0]);
  switch (savedData[0][1]) {

  };

  // TODO: Add code to display the current date in the header of the page.
  currentDay.text(dayjs().format('dddd MMMM DD, YYYY'));
  header.append(currentDay);
  });

});

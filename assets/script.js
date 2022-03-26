var current_DayEl = $('#currentDay');
var current_TimeEl = $('#currentTime');
var listContainer = $('.container');

var rightNow = moment().format('dddd, MMMM Do, YYYY');
var currentHour = moment().format("H");
var currentClass = "past";

function make_Hours () {
    var time_String = "";

    if (currentHour == 8) {
        currentClass = "present";
    } else if (currentHour < 8) {
        currentClass = "future";
    }

    $(".col-10").addClass(currentClass);

    for (let i=9; i<20; i++) {
        var new_Row = $("<section>").addClass('time-block row description');

        if (i < 12)
        {
            time_String = (i)+ " AM";
        }
        else {
            time_String = (i-11)+ " PM";
        }

        if (currentHour < i+1) {
            currentClass = "future";
        }else if (currentHour == i+1) {
            currentClass = "present";
        }

        console.log("comparing " +currentHour+ " to " +i);
        
        console.log(currentHour);
        var timeEl = $('<div>').addClass('d-flex align-items-center justify-content-center hour col-1').text(time_String);
        var textEl = $('<textarea>').addClass('col-10 '+currentClass).text("");
        var buttonEl = $('<btn>').addClass('d-flex align-items-center justify-content-center saveBtn col-1').text("Save \n 💾");

        new_Row.append(timeEl, textEl, buttonEl);

        listContainer.append(new_Row);
    }
}

function displayTime() {
    rightNow = moment().format('dddd, MMMM Do, YYYY');
    current_DayEl.text(rightNow);

    rightNow = moment().format("hh:mm:ss A")
    current_TimeEl.text(rightNow);
}

make_Hours();

setInterval(displayTime, 1000);
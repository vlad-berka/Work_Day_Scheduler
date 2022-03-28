//Handle to the HTML element that displays the day / date
var current_DayEl = $('#currentDay');
//Handle to the HTML element that displays the time of day
var current_TimeEl = $('#currentTime');

//Pulls the day's items from localStorage
var savedData = JSON.parse(localStorage.getItem("savedData"));

// Variable to set the number of hours in a day - used for both the localStorage array
// as well as the displayed hours in the day (length of day = hours +1)
var lengthOfDay = 9;

//Function checks to see if there is localStorage Data
function checkForData() {
    //If no data present....
    if (savedData == null){
        //Then initialize an empty array
        savedData = [];
        for (let i=0; i<lengthOfDay; i++){
            savedData.push("");
        }
    }
    //Save & push the data back into localStorage
    localStorage.setItem("savedData", JSON.stringify(savedData));
}

//Function displays the listed hours in the day
function make_Hours () {
    //Check for local storage - variable is used to fill in the 'textarea' element
    checkForData();
    //Initializing local variables
    var time_String = "";
    var currentHour = moment().format("H");
    //NOTE: List elements by default are considered in the past
    var currentClass = "past";

    //Quick logic check to see if the first line item is in the present, or future
    if (currentHour == 8) {
        currentClass = "present";
    } else if (currentHour < 8) {
        currentClass = "future";
    }

    //Sets the first list item from the original HTML file to the proper class for CSS formatting
    $(".col-10").addClass(currentClass).text(savedData[0]).attr("data-id", 0);
    $(".saveBtn").attr("data-id", 0);

    //Loop over the remaining hours in the day to create the remaining list items into the DOM
    for (let i=9; i<(9+lengthOfDay); i++) {
        //Initializes a new row element using JQuery
        var new_Row = $("<section>").addClass('time-block row description');

        //Logic statements to correctly populate the time column 
        if (i < 12)
        {
            time_String = (i)+ " AM";
        }
        else if (i==12){
            time_String = (i)+ " PM";
        }
        else {
            time_String = (i-12)+ " PM";
        }

        //Logic statements to assign classes that format the rows using classes referenced by CSS
        if (currentHour < i) {
            currentClass = "future";
        }else if (currentHour == i) {
            currentClass = "present";
        }

        //Initializes the three column elements to be inserted into the row
        // time of day - text - save button
        var timeEl = $('<div>').addClass('d-flex align-items-center justify-content-center hour col-1').text(time_String);
        var textEl = $('<textarea>').addClass('col-10 '+currentClass).text(savedData[i-8]).attr("data-id", i-8);
        var buttonEl = $('<btn>').addClass('d-flex align-items-center justify-content-center saveBtn col-1').attr("data-id", i-8).text("Save \n 💾");

        //Appends the above mentioned items into the row element, not yet added to the DOM
        new_Row.append(timeEl, textEl, buttonEl);

        //Appending the row element into the DOM
        $('.container').append(new_Row);
    }
}

//Function to properly display the time at the top of the webpage
function displayTime() {
    //Sets the date
    current_DayEl.text(moment().format('dddd, MMMM Do, YYYY'));
    //Sets the time of day
    current_TimeEl.text(moment().format("hh:mm:ss A"));
}

//Function for the button's save event - sends data into localStorage
function saveMe(event) {
    //Gets the value stored in the textarea and stores in the string textToSave
    var textToSave = (event.target.parentNode.children[1].value);
    //Gets the row ID number that corresponds to the localStorage index number
    var storageIndex = (event.target.getAttribute("data-id"));

    //inserts the text from textArea into the global data array
    savedData[storageIndex] = textToSave;

    //sends the entire data array back up into localStorage
    localStorage.setItem("savedData", JSON.stringify(savedData));
}

// INIT GROUP ----------
// Starts the display timer at the top of the screen, relative to time of day
setInterval(displayTime, 1000);
// Populates the webpage and pulls from data
make_Hours();
// Waits until the user wants to save data - which sends it to localStorage
$('.container').on('click', saveMe);
// ---------------------
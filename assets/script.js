var current_DayEl = $('#currentDay');
var current_TimeEl = $('#currentTime');
var listContainer = $('.container');

var rightNow = moment().format('dddd, MMMM Do, YYYY');
var currentHour = moment().format("H");
var currentClass = "past";
var savedData = JSON.parse(localStorage.getItem("savedData"));

function checkForData() {
    if (savedData == null){
        console.log("savedData is null within checkForData");
        savedData = [];
        for (let i=8; i<18; i++){
            savedData.push("");
        }
    }
}

function writeData() {
    if (savedData == null){
        console.log("savedData is null within writeData");
        return;
    }
    else {
        for (let j=0; j<savedData.length; j++) {
            console.log("In writeData for loop at j= " +j);
            console.log(savedData[j]);
            $("textarea").find("[data-id='"+j+"']").text(savedData[j]);
        }
    }
}

function make_Hours () {
    var time_String = "";

    if (currentHour == 8) {
        currentClass = "present";
    } else if (currentHour < 8) {
        currentClass = "future";
    }

    $(".col-10").addClass(currentClass).attr("data-id", "text0");
    $(".saveBtn").attr("data-id", 0);

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

        var timeEl = $('<div>').addClass('d-flex align-items-center justify-content-center hour col-1').text(time_String);
        var textEl = $('<textarea>').addClass('col-10 '+currentClass).text("").attr("data-id", i-8);
        var buttonEl = $('<btn>').addClass('d-flex align-items-center justify-content-center saveBtn col-1').attr("data-id", i-8).text("Save \n 💾");

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

function saveMe(event) {
    //Gets the value stored in the textarea and stores in the string textToSave
    var textToSave = (event.target.parentNode.children[1].value);
    //Gets the row ID number that corresponds to the localStorage index number
    var storageIndex = (event.target.getAttribute("data-id"));

    savedData[storageIndex] = textToSave;

    localStorage.setItem("savedData", JSON.stringify(savedData));
}

checkForData();
make_Hours();
writeData();
setInterval(displayTime, 1000);
listContainer.on('click', saveMe);
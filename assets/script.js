function make_Hours () {
    var time_String = "";

    document.body.appendChild(document.createElement("div"));
    document.body.lastChild.setAttribute("class", "container-fluid");

    for (let i=0; i<10; i++) {
        if (i < 5)
        {
            time_String = (8+i)+ " AM";
        }
        else {
            time_String = (i-4)+ " PM";
        }

        document.body.lastChild.appendChild(document.createElement("div"));
        document.body.lastChild.lastChild.setAttribute("class", "row justify-content-center");
        document.body.lastChild.lastChild.appendChild(document.createElement("div"));
        document.body.lastChild.lastChild.lastChild.setAttribute("class", "col-1 text-right");
        document.body.lastChild.lastChild.lastChild.textContent = time_String;

        document.body.lastChild.lastChild.appendChild(document.createElement("div"));
        document.body.lastChild.lastChild.lastChild.setAttribute("class", "col-8 text-center");
        // document.body.lastChild.lastChild.lastChild.textContent = time_String;

        document.body.lastChild.lastChild.appendChild(document.createElement("div"));
        document.body.lastChild.lastChild.lastChild.setAttribute("class", "col-1 text-left");
        // document.body.lastChild.lastChild.lastChild.textContent = time_String;
    }
}

make_Hours();
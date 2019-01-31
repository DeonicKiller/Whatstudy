

/**
 * Add actions to page buttons 
 */
function addButtonActions() {
    var test = document.getElementById('test');

    test.addEventListener("click", function () {
        fetchRooms();
    });

}

/*
 * fetch Rooms throught Api
 */
function fetchRooms() {
    var token = "259a7abd9185e783b791029864c2be6be6d17f18a1c094ec";
    var myApi = new Api('GET', 'rooms/check/' + token, null);
    myApi.execute(showRooms, errorRooms);
}
/*
 * show recieved Rooms
 */
function showRooms(response) {
    console.log(response);
}

/*
 * error fetching Rooms
 */
function errorRooms(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
}

function tokenSuccess(token) {
    console.log(token);
    var voorNaam = token.name.first;
    var achterNaam = token.name.last;
    var studentNummer = token.id;
    /**
     * Alert for name of user
     */
    alert(voorNaam + " " + achterNaam + " " + studentNummer);
    var WelkomsMelding = getElementById("naam");

    WelkomsMelding.innerHTML = "welkom" +(token.name.first + " " + token.name.last);


function tokenError(message) {
    console.log(message);
    /**
     * Error alert Pls login
     */
    alert("Om toegang te krijgen tot whatstudy moet u inloggen op Epic");
}




// initialize
addButtonActions();
getToken();

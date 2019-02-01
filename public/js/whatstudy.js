/**
 * Globale var's
 */
var getAPI    = new Api("GET");
var postAPI   = new Api("POST");
var putAPI    = new Api("PUT");
var deleteAPI = new Api("DELETE");
var voorNaam;
var achterNaam;
var studentNummer;
var codeToken = null;

function tokenSuccess(token) {
    console.log(token);
    voorNaam = token.name.first;
    achterNaam = token.name.last;
    studentNummer = token.id;
    codeToken = token;
    

    /**
     * Alert for name of user
     */
    var WelkomsMelding = document.getElementById("naam");
    var studentNummerinl = document.getElementById("studentnummer");
    WelkomsMelding.innerHTML = "welkom" + " " + (voorNaam + " " + achterNaam);
    studentNummerinl.innerHTML = (studentNummer);
}

function fetchMessages ()
{
    if (codeToken)
    {
    getAPI.route = 'messages/check/' + codeToken.token;
    getAPI.data = null;
}
getAPI.execute(showMessages, showMessagesFailed);
}



// Show Alle berichten
function showMessages(response) {
    // User 1
    var user_id0 = document.getElementById("userid-0");
    var room_id0 = document.getElementById("roomid-0");
    var description0 = document.getElementById("description-0");

    user_id0.innerHTML = response[0].user_id;
    room_id0.innerHTML = response[0].room_id;
    description0.innerHTML = response[0].description;

    // User 2
    var user_id1 = document.getElementById("userid-0");
    var room_id1 = document.getElementById("roomid-0");
    var description1 = document.getElementById("description-0");

    user_id1.innerHTML = response[1].user_id;
    room_id1.innerHTML = response[1].room_id;
    description1.innerHTML = response[1].description;


}

// Fout bericht als de berichten niet worden opgehaald
function showMessagesFailed() {
alert("Het ophalen van de berichten is niet gelukt");
}

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
function fetchRooms() 
{
    if (codeToken)
    {
        getAPI.route = "rooms/check/" + codeToken.token;
        getAPI.data  = null;
    }
    getAPI.execute(showRooms, errorRooms);
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
//fetchMessages();

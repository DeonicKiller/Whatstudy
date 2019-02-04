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
//var valideToken = false;


function tokenSuccess(token) {
    console.log(token);
    voorNaam = token.name.first;
    achterNaam = token.name.last;
    studentNummer = token.id;
    codeToken = token;
    //valideToken = true;
    
    /**
     * Alert for name of user
     */
    var WelkomsMelding = document.getElementById("naam");
    var studentNummerinl = document.getElementById("studentnummer");
    WelkomsMelding.innerHTML = "welkom" + " " + (voorNaam + " " + achterNaam);
    studentNummerinl.innerHTML = (studentNummer);
}

// Show Alle berichten
function showMessages(response) {
    
    if (Array.isArray(response)){
    response.forEach(function (value, key) {
   var user_id0 = document.getElementById(("user_id-" + (key + 1)));
   var room_id0 = document.getElementById(("room_id-" + (key + 1)));
   var description0 = document.getElementById(("description-" + (key + 1)));

   var user_id = value.user_id;
   var room_id = value.room_id;
   var description = value.description;

    user_id0.innerHTML = user_id;
    room_id0.innerHTML = room_id;
    description0.innerHTML = description;
    
});
}
}

// Fout bericht als de berichten niet worden opgehaald
function showMessagesFailed() {
alert("Het ophalen van de berichten is niet gelukt");
}

/**
 * Add actions to page buttons 
 */
function addButtonActions() {
    var MessagesOphalen = document.getElementById('messagesOphalen');
    var publicPage = document.getElementById("public_Name");
    var homePage = document.getElementById("home_Page");
    var roomsPage = document.getElementById("rooms_Page");
    
    MessagesOphalen.addEventListener("click", function () {
        fetchMessages();
    });

    publicPage.addEventListener("click", function() {
        showPublicPage();
    });

    homePage.addEventListener("click", function() {
        showHomePage();
    });

    roomsPage.addEventListener("click", function() {
        fetchRooms();
    });



}

/**
 *  fetch Messages trought Api
 */
function fetchMessages ()
{
    if (codeToken)
    {
    getAPI.route = "messages/check/" + codeToken.token;
    getAPI.data = null;
    }
    getAPI.execute(showMessages, showMessagesFailed);
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
    //valideToken = false;

    /**
     * Error alert Pls login
     */
    alert("Om toegang te krijgen tot whatstudy moet u inloggen op Epic");
}

function hideAllPages(){
var publicPage = document.getElementById("publicRoomPage");
var homePage = document.getElementById('homePage');

publicPage.style.display = 'none';
homePage.style.display = 'none';
}

//test
function showHomePage() {
    var homePage = document.getElementById('homePage');
    homePage.style.display = 'block';

    hideAllPages();

    homePage.style.display = 'block';
}

function showPublicPage() {
    var page = document.getElementById('publicRoomPage');

    hideAllPages();

    page.style.display = 'block';
}




/**
 * Nog proberen te fixen werkt niet
 */
/*function messagesFix() {
    
    if (valideToken) {
        fetchMessages
    } else {
        alert ('Login')
    } 
}
*/


// initialize
showHomePage();
addButtonActions();
getToken();
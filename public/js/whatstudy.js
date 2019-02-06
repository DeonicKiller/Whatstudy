/**
 * Globale var's
 */
var getAPI = new Api("GET");
var postAPI = new Api("POST");
var putAPI = new Api("PUT");
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

    var userId = document.getElementById("userid-0");
    var description = document.getElementById("description-0");
    var time = document.getElementById("time-0");
    var name =document.getElementById("name-0");

    userId.innerHTML = response[0].user_id;
    time.innerHTML ="(" + response[0].created_at + ")";
    description.innerHTML = response[0].description;
    name.innerHTML = (voorNaam + " " + achterNaam);

    var userId = document.getElementById("userid-1");
    var description = document.getElementById("description-1");
    var time = document.getElementById("time-1");
    var name =document.getElementById("name-1");
    
    userId.innerHTML = response[1].user_id;
    time.innerHTML ="(" + response[1].created_at + ")";
    description.innerHTML = response[1].description;
    name.innerHTML = (voorNaam + " " + achterNaam);

    var userId = document.getElementById("userid-2");
    var description = document.getElementById("description-2");
    var time = document.getElementById("time-2");
    var name =document.getElementById("name-2");

    userId.innerHTML = response[2].user_id;
    time.innerHTML ="(" + response[2].created_at + ")";
    description.innerHTML = response[2].description;
    name.innerHTML = (voorNaam + " " + achterNaam);
    
    var userId = document.getElementById("userid-3");
    var description = document.getElementById("description-3");
    var time = document.getElementById("time-3");
    var name =document.getElementById("name-3");

    userId.innerHTML = response[3].user_id;
    time.innerHTML ="(" + response[3].created_at + ")";
    description.innerHTML = response[3].description;
    name.innerHTML = (voorNaam + " " + achterNaam);

    var userId = document.getElementById("userid-4");
    var description = document.getElementById("description-4");
    var time = document.getElementById("time-4");
    var name =document.getElementById("name-4");

    userId.innerHTML = response[4].user_id;
    time.innerHTML ="(" + response[4].created_at + ")";
    description.innerHTML = response[4].description;
    name.innerHTML = (voorNaam + " " + achterNaam);



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
    var publicName = document.getElementById("public_Name")

    MessagesOphalen.addEventListener("click", function () {
        fetchMessages();
    });

    publicPage.addEventListener("click", function () {
        showPublicPage();
    });

    homePage.addEventListener("click", function () {
        showHomePage();
    });

    roomsPage.addEventListener("click", function () {
        fetchRooms();
    });

    publicName.addEventListener("click", function () {
        fetchMessages();
    });



}

/**
 *  fetch Messages trought Api
 */
function fetchMessages() {
    if (codeToken) {
        getAPI.route = "messages/check/" + codeToken.token;
        getAPI.data = null;
    }
    getAPI.execute(showMessages, showMessagesFailed);
}

/*
 * fetch Rooms throught Api
 */
function fetchRooms() {
    if (codeToken) {
        getAPI.route = "rooms/check/" + codeToken.token;
        getAPI.data = null;
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

function hideAllPages() {
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

/*var xHttp = new XMLHttpRequest();
xHttp.onreadystatechange = function () {
    if (xHttp.readyState == XMLHttpRequest.DONE) {
        if (xHttp.status == 200 || xHttp.status == 201) {
            var response = JSON.parse(xHttp.response);
            room_Names(response);
        }
    }
};
*/


// initialize
showHomePage();
addButtonActions();
getToken();
//room_Names(response);

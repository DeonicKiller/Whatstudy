/**
 * Globale var's
 */
/*var getAPI = new Api("GET");
var postAPI = new Api("POST");
var putAPI = new Api("PUT");
var deleteAPI = new Api("DELETE");*/
var voorNaam;
var achterNaam;
var studentNummer;
var codeToken = null;
var localeResponsRooms;
var messagesParentContainer = document.getElementById("publicRoomPage")
var link_Epic = document.getElementById("link-epic")

function tokenSuccess(token) {
    link_Epic.style.display = 'none';
    voorNaam = token.name.first;
    achterNaam = token.name.last;
    studentNummer = token.id;
    codeToken = token;
    fetchRooms();

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

    for (var i = 0; i < response.length; i++) {

        var messagesContainer = document.createElement("div");
        messagesContainer.setAttribute("class", "messages");

        var messagesContaineruserid = document.createElement("p")
        messagesContaineruserid.setAttribute("class", "user_id");

        var messagesContainerdescription = document.createElement("p")
        messagesContainerdescription.setAttribute("class", "text-right");

        var messagesContainertime = document.createElement("p");
        messagesContainertime.setAttribute("class", "time");

        //appends created containers into parent div 
        messagesParentContainer.appendChild(messagesContainer);
        messagesContainer.appendChild(messagesContaineruserid);
        messagesContainer.appendChild(messagesContainerdescription);
        messagesContainer.appendChild(messagesContainertime);

        //populates every element with corresponding attribute from api
        messagesContaineruserid.innerHTML = response[i].user_id;
        messagesContainerdescription.innerHTML = response[i].description;
        messagesContainertime.innerHTML = response[i].created_at;

    } {
        var inputMessages = document.createElement("input");
        inputMessages.setAttribute("class", "input_messages")

        messagesContainer.appendChild(inputMessages);
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
    var publicPage = document.getElementById("public-name");
    var homePage = document.getElementById("home_page");

    homePage.addEventListener("click", function () {
        showHomePage();
    });

    publicPage.addEventListener("click", function () {
        fetchMessages();
        showPublicPage();
    });
}

/**
 *  fetch Messages trought Api
 */
function fetchMessages() {
    if (codeToken) {
        var myAPI = new Api("GET");
        myAPI.route = "messages/check/" + codeToken.token;
        myAPI.data = null;
        myAPI.execute(showMessages, showMessagesFailed);
    } else {
        alert("Messages zijn er nog niet");
    }

}

/*
 * fetch Rooms throught Api
 */
function fetchRooms() {

    if (codeToken) {
        var myAPI = new Api("GET");
        myAPI.route = "rooms/check/" + codeToken.token;
        myAPI.data = null;
        myAPI.execute(showRooms, errorRooms);
    } else {
        alert("token is er niet")
    }

}


/*
 * show recieved Rooms
 */
function showRooms(response) {
    localeResponsRooms = response;
    console.log(localeResponsRooms);
    showHomePage();
    fillMenu();
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

function hideAllPages() {
    var publicPage = document.getElementById("publicRoomPage");
    var homePage = document.getElementById('homePage');

    publicPage.style.display = 'none';
    homePage.style.display = 'none';

}

//test
function showHomePage() {
    var homePage = document.getElementById('homePage');

    hideAllPages();

    homePage.style.display = 'block';
}

function showPublicPage() {
    var page = document.getElementById('publicRoomPage');
    var publicPage = document.getElementById('public-name');


    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'none';
}

function fillMenu() {
    var publicPage = document.getElementById('public-name');
    var html_cssPage = document.getElementById("html/css_name");
    var javascript_Page = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");

    publicPage.innerHTML = localeResponsRooms[0].name;
    html_cssPage.innerHTML = localeResponsRooms[1].name;
    javascript_Page.innerHTML = localeResponsRooms[2].name;
    laravel_lumenPage.innerHTML = localeResponsRooms[3].name;
    fitnesse_Page.innerHTML = localeResponsRooms[4].name;
    mysql_Page.innerHTML = localeResponsRooms[5].name;
    vue_jsPage.innerHTML = localeResponsRooms[6].name;
    git_Page.innerHTML = localeResponsRooms[7].name;
    installation_Page.innerHTML = localeResponsRooms[8].name;
    bootstrap_Page.innerHTML = localeResponsRooms[9].name;
}

// initialize
addButtonActions();
getToken();
hideAllPages();

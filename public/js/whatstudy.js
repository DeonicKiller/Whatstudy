/**
 * Globale var's
 */
var voorNaam;
var achterNaam;
var studentNummer;
var codeToken = null;
var localeResponsRooms;
var messagesParentContainer = document.getElementById("publicRoomPage");
var link_Epic = document.getElementById("link-epic");

function tokenSuccess(token) {
    link_Epic.style.display = 'none';
    voorNaam = token.name.first;
    achterNaam = token.name.last;
    studentNummer = token.id;
    codeToken = token;
    fetchRooms();

    /**
     * Alert for name of user
     */
    var WelkomsMelding = document.getElementById("naam");
    var studentNummerinl = document.getElementById("studentnummer");
    WelkomsMelding.innerHTML = "welkom" + " " + (voorNaam + " " + achterNaam);
    studentNummerinl.innerHTML = (studentNummer);
}

// Show Alle berichten
function showMessages(responsePage) {

    var response = responsePage.data;
    console.info("Aantal Messages" + " " + response.length);

    for (var i = response.length - 1; i > -1; i--) {

        var messagesContainer = document.createElement("div");
        messagesContainer.setAttribute("class", "messages");

        var messagesContaineruserid = document.createElement("p");
        messagesContaineruserid.setAttribute("class", "user_id");

        var messagesContainerdescription = document.createElement("p");
        messagesContainerdescription.setAttribute("class", "description");

        var messagesContainertime = document.createElement("p");
        messagesContainertime.setAttribute("class", "time");

        //appends created containers into parent div 
        messagesParentContainer.appendChild(messagesContainer);
        messagesContainer.appendChild(messagesContaineruserid);
        messagesContainer.appendChild(messagesContainerdescription);
        messagesContainer.appendChild(messagesContainertime);

        //populates every element with corresponding attribute from api
        messagesContaineruserid.innerHTML = response[i].created_at + "," + " " + "(" + response[i].user_id + ")";
        messagesContainerdescription.innerHTML = response[i].description;

    }

    var inputContainer = document.createElement("input");
    inputContainer.setAttribute("id", "input_messages");
    inputContainer.setAttribute("placeholder", "Typ hier");

    var buttonContainer = document.createElement("BUTTON");
    buttonContainer.setAttribute("id", "button-send");

    messagesParentContainer.appendChild(inputContainer);
    messagesParentContainer.appendChild(buttonContainer);

    buttonContainer.innerHTML = "Send";

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

    document.addEventListener('click',function(e){
        if(e.target && e.target.id== 'button-send'){alert("Nog mee bezig"); postMessage();}
     });

    // buttonContainer.addEventListener("click", function () {
    //     alert("Test");
    // });

}

/**
 *  fetch Messages trought Api
 */
function fetchMessages() {
    if (codeToken) {
        var myAPI = new Api("GET");
        myAPI.route = "rooms/1/messages/check/" + codeToken.token;
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
        alert("token is er niet");
    }

}

/*
 * Post Message throught Api
 */
function postMessage() {

    if (codeToken) {
        var myPostAPI = new Api("POST");
        var send_Button = document.getElementById("button-send").value;
        var send = { 
            description: send_Button,
        };
        myPostAPI.route = 'messages/check/' + codeToken.token, send;
        myPostAPI.execute(postMessageSucces, errorPostMessage);
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
 * Post Message Succes
 */
function postMessageSucces(response) {

}

/*
 * error fetching Rooms
 */
function errorRooms(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
}

function errorPostMessage(response) {
    localeResponsRooms = response;
    console.log(localeResponsRooms);
    alert("Bericht versturen is niet gelukt, Probeer later nog eens");
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

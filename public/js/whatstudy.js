/**
 * Globale var's
 */
var voorNaam;
var achterNaam;
var studentNummer;
var codeToken = null;
var localeResponsRooms;
var roomId;
var messagesParentContainer = document.getElementById("publicRoomPage");
var messageDivContainer = document.getElementById("messagesDiv");
var inputDivContainer = document.getElementById("inputDiv");
var link_Epic = document.getElementById("link-epic");

/**
 * Succes message Token
 */
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

        // Container voor de losse Message
        var messagesContainer = document.createElement("div");
        messagesContainer.setAttribute("class", "messages");

        var messagesContaineruserid = document.createElement("p");
        messagesContaineruserid.setAttribute("class", "user_id");

        var messagesUser_type = document.createElement("p");
        messagesUser_type.setAttribute("class", "user_type text-center black");

        var messagesContainerdescription = document.createElement("p");
        messagesContainerdescription.setAttribute("class", "description");

        var messagesContainertime = document.createElement("p");
        messagesContainertime.setAttribute("class", "time");
        
        //populates every element with corresponding attribute from api
        messagesContaineruserid.innerHTML = response[i].created_at + " " + "(" + response[i].user.name + ")";
        messagesUser_type.innerHTML = "(" + response[i].user.user_type.name +")";
        messagesContainerdescription.innerHTML = response[i].description;

        //appends created containers into parent div 
        messagesContainer.appendChild(messagesContaineruserid);
        messagesContainer.appendChild(messagesUser_type);
        messagesContainer.appendChild(messagesContainerdescription);
        messagesContainer.appendChild(messagesContainertime);
        messageDivContainer.appendChild(messagesContainer);

    }

    var inputContainer = document.createElement("input");
    inputContainer.setAttribute("id", "input_messages");
    inputContainer.setAttribute("placeholder", "Typ hier");

    var buttonContainer = document.createElement("BUTTON");
    buttonContainer.setAttribute("id", "button-send");
    buttonContainer.setAttribute("class", "btn btn-outline-primary");

    inputDivContainer.appendChild(inputContainer);
    inputDivContainer.appendChild(buttonContainer);

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
    var htmlPage = document.getElementById("html/css_name");
    var homePage = document.getElementById("home_page");

    homePage.addEventListener("click", function () {
        showHomePage();
    });

    publicPage.addEventListener("click", function () {
        fetchMessages();
        showPublicPage();
    });

    htmlPage.addEventListener("click", function () {
        fetchMessages();
        showPublicPage();
    });

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id == 'button-send') {
            postMessage();
        }
    });

}

/**
 *  fetch Messages trought Api
 */
function fetchMessages() {
    if (codeToken) {
        var myAPI = new Api("GET");
        myAPI.route = "rooms/" + 1 + "/messages/check/" + codeToken.token;
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
    var send_Input = document.getElementById("input_messages").value;
    var send = {
        user_id: studentNummer,
        room_id: roomId,
        description: send_Input,
    };
    var myPostApi = new Api('POST', 'messages/check/' + codeToken.token, send);
    myPostApi.execute(postMessageSucces, errorPostMessage);
    //Wouter uitleg
    messageDivContainer.innerHTML += 'poep';

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
function postMessageSucces(responsePage) {
    console.info("gelukt");
    console.info(responsePage);
    // reloadPostMessage(responsePage);
}

/**
 * Error messages van de Rooms
 */
function errorRooms(statusCode, errorMessage) {
    console.log(statusCode);
    console.log(errorMessage);
}
/**
 * Error messages van Messages
 */
function errorPostMessage(response) {
    localeResponsRooms = response;
    console.log(localeResponsRooms);
    alert("Bericht versturen is niet gelukt, Probeer later nog eens");
}
/**
 * Error messages Token
 */
function tokenError(message) {
    console.log(message);

    /**
     * Error alert Pls login
     */
    alert("Om toegang te krijgen tot whatstudy moet u inloggen op Epic");
}
/**
 * Removed de div van de publicpage
 */
function reloadMessages() {
    var messagesParentContainer = document.getElementById("publicRoomPage");
    while (messagesParentContainer.hasChildNodes()) {
        messagesParentContainer.removeChild(messagesParentContainer.lastChild);
    }
    fetchMessages();
}
/**
 * Hide alle pagina's die hier in staan
 */
function hideAllPages() {
    var publicPage = document.getElementById("publicRoomPage");
    var homePage = document.getElementById('homePage');

    publicPage.style.display = 'none';
    homePage.style.display = 'none';

}

/**
 * Laat de home Pagina zien
 */
function showHomePage() {
    var homePage = document.getElementById('homePage');

    hideAllPages();

    homePage.style.display = 'block';
}
/**
 * Laat de public Pagina zien
 */
function showPublicPage() {
    var page = document.getElementById('publicRoomPage');
    var publicPage = document.getElementById('public-name');
    roomId = 1;


    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'none';
}
/**
 * Vult de Rooms in de nav bar
 */
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


function reloadPostMessage(postMessage) {
    var messagesContaineruserid = document.createElement("p");
    messagesContaineruserid.setAttribute("class", "user_id");

    var messagesUser_type = document.createElement("p");
    messagesUser_type.setAttribute("class", "user_type text-center");

    var messagesContainerdescription = document.createElement("p");
    messagesContainerdescription.setAttribute("class", "description");

    var messagesContainertime = document.createElement("p");
    messagesContainertime.setAttribute("class", "time");

    //populates every element with corresponding attribute from api
    messagesContaineruserid.innerHTML = postMessage[i].created_at + "," + " " + "(" + postMessage[i].user_id + ")";
    messagesUser_type.innerHTML = response[i].user.user_type.name;
    messagesContainerdescription.innerHTML = postMessage[i].description;

    //appends created containers into parent div 

    messagesContainer.appendChild(messagesContaineruserid);
    messagesContainer.appendChild(messagesUser_type);
    messagesContainer.appendChild(messagesContainerdescription);
    messagesContainer.appendChild(messagesContainertime);
    messageDivContainer.appendChild(messagesContainer);
}

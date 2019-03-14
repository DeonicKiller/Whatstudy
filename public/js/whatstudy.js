/**
 * Globale var's
 */
var voorNaam;
var achterNaam;
var studentNummer;
var codeToken = null;
var localeResponsRooms;
var roomId;
var messagesParentContainer = document.getElementById("alleRoomPages");
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
        messagesContainerdescription.innerHTML = response[i].description.replace(/<(?:.|\n)*?>/gm, '');

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
    
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
}

// Fout bericht als de berichten niet worden opgehaald
function showMessagesFailed() {
    alert("Het ophalen van de berichten is niet gelukt");
}

/**
 * Add actions to page buttons 
 */
function addButtonActions() {
    var homePage = document.getElementById("home_page");
    var publicPage = document.getElementById("public-name");
    var htmlPage = document.getElementById("html/css_name");
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var statistic_Page = $('#statistic_page')[0];

    homePage.addEventListener("click", function () {
        showHomePage();
    });

    publicPage.addEventListener("click", function () {
        showPublicPage();
        fetchMessages();
        reloadMessages2();
    });

    htmlPage.addEventListener("click", function () {
        showHtmlPage();
        reloadMessages2();
    });

    javascriptPage.addEventListener("click", function () {
        showJavasciptPage();
        reloadMessages2();
    });

    laravel_lumenPage.addEventListener("click", function () {
        showlaravel_lumenPage();
        reloadMessages2();
    });

    fitnesse_Page.addEventListener("click", function () {
        showFitnessePage();
        reloadMessages2();
    });

    mysql_Page.addEventListener("click", function () {
        showMysql_Page();
        reloadMessages2();
    });

    vue_jsPage.addEventListener("click", function () {
        showVue_jsPage();
        reloadMessages2();
    });

    git_Page.addEventListener("click", function () {
        gitPage();
        reloadMessages2();
    });

    installation_Page.addEventListener("click", function () {
        installationPage();
        reloadMessages2();
    });

    bootstrap_Page.addEventListener("click", function () {
        bootstrapPage();
        reloadMessages2();
    });

    statistic_Page.addEventListener("click", function () {
        showStatisticPage();
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
        myAPI.route = "rooms/" + roomId + "/messages/check/" + codeToken.token;
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
    var send_Input = document.getElementById("input_messages");
    send_Input.innerHTML = "";
    // reloadPostMessage(responsePage);
    reloadMessages();
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
 * Nodig voor de auto refresh
 */
function reloadMessages() {
    var messageDivContainer = document.getElementById("messagesDiv");
     while (messageDivContainer.hasChildNodes()) {
     messageDivContainer.removeChild(messageDivContainer.lastChild);
     }
     var inputDivContainer = document.getElementById("inputDiv");
     while (inputDivContainer.hasChildNodes()) {
     inputDivContainer.removeChild(inputDivContainer.lastChild);
    }
    fetchMessages();
}
/**
 * Removed de div van de publicpage
 */
function reloadMessages2() {
    var messageDivContainer = document.getElementById("messagesDiv");
     while (messageDivContainer.hasChildNodes()) {
     messageDivContainer.removeChild(messageDivContainer.lastChild);
     }
     var inputDivContainer = document.getElementById("inputDiv");
     while (inputDivContainer.hasChildNodes()) {
     inputDivContainer.removeChild(inputDivContainer.lastChild);
    }
}
/**
 * Hide alle pagina's die hier in staan
 */
function hideAllPages() {
    var publicPage = document.getElementById("alleRoomPages");
    var homePage = document.getElementById('homePage');
    var statistic_Page = $("#statisticPage");
    var roomnaam1 = $("#roomnaam1");
    var roomnaam2 = $("#roomnaam2");
    var roomnaam3 = $("#roomnaam3");
    var roomnaam4 = $("#roomnaam4");
    var roomnaam5 = $("#roomnaam5");
    var roomnaam6 = $("#roomnaam6");
    var roomnaam7 = $("#roomnaam7");
    var roomnaam8 = $("#roomnaam8");
    var roomnaam9 = $("#roomnaam9");
    var roomnaam10 = $("#roomnaam10");

    roomnaam1.css("display", "none");
    roomnaam2.css("display", "none");
    roomnaam3.css("display", "none");
    roomnaam4.css("display", "none");
    roomnaam5.css("display", "none");
    roomnaam6.css("display", "none");
    roomnaam6.css("display", "none");
    roomnaam7.css("display", "none");
    roomnaam8.css("display", "none");
    roomnaam9.css("display", "none");
    roomnaam10.css("display", "none");
    statistic_Page.css("display", "none");
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

function showStatisticPage() {
    var statistic_Page = $("#statisticPage");
    var page = document.getElementById("statisticPage");

    hideAllPages();

    statistic_Page.css("display", "block");
    page.style.display = 'block';
}
/**
 * Laat de Public Pagina zien
 */
function showPublicPage() {
    var page = document.getElementById('alleRoomPages');
    var publicPage = document.getElementById('public-name');
    var htmlPage = document.getElementById("html/css_name");
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam1 = $("#roomnaam1");

    
    roomId = 1;

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'none';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam1.css("display", "block");
}
/**
 * Laat de Html Pagina zien
 */
function showHtmlPage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam2 = $("#roomnaam2");

    roomId = 2;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'none';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam2.css("display", "block");
}

function showJavasciptPage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam3 = $("#roomnaam3");

    roomId = 3;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'none';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam3.css("display", "block");
}

function showlaravel_lumenPage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam4 = $("#roomnaam4");

    roomId = 4;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'none';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam4.css("display", "block");
}

function showFitnessePage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam5 = $("#roomnaam5");

    roomId = 5;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'none';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam5.css("display", "block");
}

function showMysql_Page() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam6 = $("#roomnaam6");

    roomId = 6;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'none';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam6.css("display", "block");
}

function showVue_jsPage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam7 = $("#roomnaam7");

    roomId = 7;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'none';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam7.css("display", "block");
}

function gitPage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam8 = $("#roomnaam8");

    roomId = 8;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'none';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'block';
    roomnaam8.css("display", "block");
}

function installationPage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam9 = $("#roomnaam9");

    roomId = 9;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'none';
    bootstrap_Page.style.display = 'block';
    roomnaam9.css("display", "block");
}

function bootstrapPage() {
    var page = document.getElementById("alleRoomPages");  
    var htmlPage = document.getElementById("html/css_name");
    var publicPage = document.getElementById('public-name');
    var javascriptPage = document.getElementById("javascript_name");
    var laravel_lumenPage = document.getElementById("larvavel/lumen_name");
    var fitnesse_Page = document.getElementById("fitnesse_name");
    var mysql_Page = document.getElementById("mysql_name");
    var vue_jsPage = document.getElementById("vue.js_name");
    var git_Page = document.getElementById("git_name");
    var installation_Page = document.getElementById("installation_name");
    var bootstrap_Page = document.getElementById("bootstrap-name");
    var roomnaam10 = $("#roomnaam10");
    

    roomId = 10;
    reloadMessages();

    hideAllPages();

    page.style.display = 'block';
    publicPage.style.display = 'block';
    htmlPage.style.display = 'block';
    javascriptPage.style.display = 'block';
    laravel_lumenPage.style.display = 'block';
    fitnesse_Page.style.display = 'block';
    mysql_Page.style.display = 'block';
    vue_jsPage.style.display = 'block';
    git_Page.style.display = 'block';
    installation_Page.style.display = 'block';
    bootstrap_Page.style.display = 'none';
    roomnaam10.css("display", "block");
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
/**
 * Vraag wouter voor refresh
 */
//   setInterval(function(){reloadMessages()}, 3000);


// function reloadPostMessage(postOneMessage) {
    
//     var messagesContaineruserid = document.createElement("p");
//     messagesContaineruserid.setAttribute("class", "user_id");

//     var messagesUser_type = document.createElement("p");
//     messagesUser_type.setAttribute("class", "user_type text-center");

//     var messagesContainerdescription = document.createElement("p");
//     messagesContainerdescription.setAttribute("class", "description");

//     var messagesContainertime = document.createElement("p");
//     messagesContainertime.setAttribute("class", "time");

//     // Container voor de losse Message
//     var messagesContainer = document.createElement("div");
//     messagesContainer.setAttribute("class", "messages");

//     //populates every element with corresponding attribute from api
//     messagesContaineruserid.innerHTML = postOneMessage.created_at + "," + " " + "(" + postOneMessage.user_id + ")";
//     messagesUser_type.innerHTML = postOneMessage.user.user_type.name;
//     messagesContainerdescription.innerHTML = postOneMessage.description;

//     //appends created containers into parent div 

//     messagesContainer.appendChild(messagesContaineruserid);
//     messagesContainer.appendChild(messagesUser_type);
//     messagesContainer.appendChild(messagesContainerdescription);
//     messagesContainer.appendChild(messagesContainertime);
//     messageDivContainer.appendChild(messagesContainer);
    
// }


function showChart() {

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: ["Public",],
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }, {
                label: ["HTML/CSS",],
                backgroundColor: 'rgb(0,128,0)',
                borderColor: 'rgb(0,128,0)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        },

        // Configuration options go here
        options: {}
    });
}

showChart();

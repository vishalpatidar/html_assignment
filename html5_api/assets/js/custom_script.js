$(document).ready( function() {

    // call to storage function on form submit
    $('#login-form').submit( function(e) {
        var social_site = $(".social-site").val();
        var username    = $("input[name=username]").val();
        var password    = $("input[name=password]").val();
        if (social_site == "facebook") {
            fbLogin(username, password);
        }else if (social_site == "twitter") {
            twitterLogin(username, password);
        }
    });

    // display username if set
    if (sessionStorage.username) {
        $("#user-login-name").text("Welcome " + sessionStorage.getItem("username"));
    } else if (localStorage.username) {
        $("#user-login-name").text("Welcome " + localStorage.getItem("username"));
    } else {
        $("#user-login-name").val("Not logged in!");
    }

    // Store and display content from history
    $('.menu-links').on('click', function(e){
        e.preventDefault();
        var href = $(this).children('a').attr('href');
        // Getting Content
        getContent(href, true);

        jQuery('.menu-links').removeClass('active');
        $(this).addClass('active');
    });
});

//set the clicked social site name to hidden field of form
function setHidden(element) {
    var element_id = $(element).attr("id");

    if (element_id == "facebook") {
        $(".social-site").val("facebook");
    }else if (element_id == "twitter") {
        $(".social-site").val("twitter");
    }
}

// count facebook clicks and store in local storage
function fbLogin(username, password) {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.username) {
            localStorage.username = username;
        } else {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        }
    }
}

// count twitter clicks and store in session storage
function twitterLogin(username, password) {
    if(typeof(Storage) !== "undefined") {
        if (sessionStorage.username) {
            sessionStorage.username = username;
        } else {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("password", password);
        }
    }
}

// Adding popstate event listener to handle browser back button
window.addEventListener("popstate", function(e) {

    if ( location.pathname == "/" || location.pathname == "/index.html" ) {
        window.location.href = "/";
    } else {
        getContent(location.pathname, false);
    }

});

// get content from history
function getContent(url, addEntry) {
    $.get(url)
    .done(function( data ) {

        // Updating Content on Page
        $('#contentHolder').html(data);

        if(addEntry == true) {
            // Add History Entry using pushState
            history.pushState(null, null, url);
        }

    });
}

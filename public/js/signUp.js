$(document).ready(function(){

    $("#regUser").on("click", function(){
        username = $("#newUser").val();
        password = $("#newPass").val();
        $.ajax({
            type: "POST",
            url: "/create/profile/",
            data: {
                username: username,
                password: password
            }
        }) 
    });


})
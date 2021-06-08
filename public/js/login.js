$(document).ready(function(){

    $("#loginBtn").on("click", function(e) {
        e.preventDefault();
        const userLogin = $("#userLogin").val()
        const passLogin = $("#passLogin").val()
        console.log(userLogin + " " + passLogin)
        $.ajax({
            type: "POST",
            url: `/login/`,
            data: {
                user: userLogin,
                password: passLogin
            },
            success: function(result) {
                console.log(result)
                sessionStorage.setItem("username", userLogin)
            },
            error: function(err) {
                console.log(err)
            }

        })

    })
});
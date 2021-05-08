$(document).ready(function(){

//get storage

var username = sessionStorage.getItem("username")
var stamp = sessionStorage.getItem("stamp")

console.log(username + " " + stamp)

$.ajax({
    type: "GET",
    url: `/summary/${username}/${stamp}/`,
    success: function(result) {
        if (!result) {
            $("#summary").append(`
                <p>NothingHere</p>
            `)
        } else {
            $("#summary").append(`
                <p>${result.user} ${result.stamp}</p>
            `)
        }
    },
    error: function(err) {
        console.log(err)
    }
})


})
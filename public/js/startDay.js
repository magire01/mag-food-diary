$(document).ready(function(){
    var username = sessionStorage.getItem("username")
    var day = sessionStorage.getItem("day")
    var date = sessionStorage.getItem("date") 
    var stamp = sessionStorage.getItem("stamp")


    $("#postDay").on("click", function(){
        $.ajax({
            type: "POST",
            url: "/create/item",
            data: {
                user: username,
                day: day,
                date: date,
                stamp: stamp,
                meal: {
                    mealName: "Breakfast",
                foodName: $("#foodNameInput").val(),
                calories: $("#caloriesInput").val(),
                comments: "test"
                }
            }
        })
    })
})
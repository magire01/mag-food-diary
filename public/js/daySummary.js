$(document).ready(function(){

//get storage

var username = sessionStorage.getItem("username")
var stamp = sessionStorage.getItem("stamp")

console.log(username + " " + stamp)

//Summary or New day
$.ajax({
    type: "GET",
    url: `/summary/${username}/${stamp}/`,
    success: function(result) {
        //Add new day screen
        if (!result) {
            $("#summary").append(`
                <p>NothingHere</p>
                <a href="/startDay/"><button>Start Day</button></a>
            `)
        //Summary Screen
        } else {
            //title div
            $("#summary").append(`
                <p>${result.user} ${result.stamp}</p>
                
            `)
            //add item div
            $("#addItem").append(`
                <button id="addItemBtn">Add Item</button>
                <div id="itemForm"> </div>
            `)
            //add item button
            $("#addItemBtn").on("click", function(){
                $("#itemForm").append(`
                    <form>
                        <p>Food</p>
                        <input id="addFoodInput" />
                        <p>Calories</p>
                        <input id="addCaloriesInput" />
                        <button type="button" id="addBtn">Submit</button>
                    </form>
                `)

                //Post Call
                $("#addBtn").on("click", function(){
                    console.log("test")
                    $.ajax({
                        type: "PUT",
                        url: `/add/${username}/${stamp}/`,
                        data: { 
                            meal: { 
                                mealName: "Breakfast",
                                foodName: $("#addFoodInput").val(),
                                calories: $("#addCaloriesInput").val(),
                                comments: "testpost"
                            }
                        },
                        success: function(result) {
                        console.log("Successfully added");
                        },
                        error: function(err) {
                        console.log(err);
                    }});
                    console.log("add test: " + username + " " + stamp)
                    window.location.reload();
                });
            })

            //food items div
            for(var i = 0; i < result.meal.length; i++) {
                $("#showItems").append(`
                    <p>${result.meal[i].foodName}</p>
                    <p>${result.meal[i].calories} cal</p>
                `)
            }
            
            
        
        }
    },
    error: function(err) {
        console.log(err)
    }
})


})
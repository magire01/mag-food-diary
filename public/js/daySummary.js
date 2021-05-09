$(document).ready(function(){

//get storage

var username = sessionStorage.getItem("username")
var stamp = sessionStorage.getItem("stamp")
var selectedMeal = "Breakfast";

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
                <div id="currentMeal"> </div>
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
                //current meal buttons

    $("#currentMeal").append(
        `<button id="breakfastBtn">Breakfast</button>
        <button id="lunchBtn">Lunch</button>
        <button id="dinnerBtn">Dinner</button>
        <button id="snackBtn">Snack</button>`);

    $("#breakfastBtn").on("click", function(e) {
        e.preventDefault();
        selectedMeal="Breakfast";
        $('button').removeClass("activeBtn");
        $(this).addClass("activeBtn");
    })

    $("#lunchBtn").on("click", function(e) {
        e.preventDefault();
        selectedMeal="Lunch";
        $('button').removeClass("activeBtn");
        $(this).addClass("activeBtn");
    })

    $("#dinnerBtn").on("click", function(e) {
        e.preventDefault();
        selectedMeal="Dinner";
        $('button').removeClass("activeBtn");
        $(this).addClass("activeBtn");
    })

    $("#snackBtn").on("click", function(e) {
        e.preventDefault();
        selectedMeal="Snack";
        $('button').removeClass("activeBtn");
        $(this).addClass("activeBtn");
    })


                //Post Call
                $("#addBtn").on("click", function(){
                    console.log("test")
                    $.ajax({
                        type: "PUT",
                        url: `/add/${username}/${stamp}/`,
                        data: { 
                            meal: { 
                                mealName: selectedMeal,
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
                    window.location.reload();
                });
            })

            //food items div
            for(var i = 0; i < result.meal.length; i++) {
                $("#showItems").append(`
                    <p>${result.meal[i].foodName}</p>
                    <p>${result.meal[i].calories} cal</p>
                    <p>${result.meal[i].mealName}</p>
                `)
            }
            
            
        
        }
    },
    error: function(err) {
        console.log(err)
    }
})


})
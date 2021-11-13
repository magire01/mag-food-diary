$(document).ready(function(){

//get storage

var username = sessionStorage.getItem("username")
var stamp = sessionStorage.getItem("stamp")
var selectedMeal = "Breakfast";

console.log(username + " " + stamp)

//logout
$("#logoutdiv").append(`
    <button id="logout">Logout</button>
    `)

$("#logout").on("click", function(){
    $.cookie("token", null, { path: '/' });
})
//Summary or New day
$.ajax({
    type: "GET",
    url: `/summary/${username}/${stamp}/`,
    success: function(result) {
        //Add new day screen
        if (!result) {
            $("#summary").append(`
            <div class="row centerText">
                <p class="h3">Start Tracking Today's Meals</p>
                <a href="/startDay/"><button class="btn addItemBtn">Start Day</button></a>
            </div>
            `)
        //Summary Screen
        } else {
            //title div
            $("#summary").append(`
            <div class="row centerText">
                <p class="h3">${result.user}</p>
                <p class="h5">${result.day} ${result.date}</p>
            </div>
            `)
            //add item div
            $("#addItem").append(`
                <button class="btn addItemBtn" id="addItemBtn">Add Item</button>
                <div id="currentMeal"> </div>
                <div id="itemForm"> </div>
            `)
            //add item button
            $("#addItemBtn").on("click", function(){
                let toggle = false;

                if (!toggle) {
                    $("#itemForm").append(`
                    <div class="card addItemForm">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="activeBtn" id="breakfastBtn">Breakfast</button>
                            <button type="button" id="lunchBtn">Lunch</button>
                            <button type="button" id="dinnerBtn">Dinner</button>
                            <button type="button" id="snackBtn">Snack</button>
                        </div>
                        <form>
                            <p>Food</p>
                            <input id="addFoodInput" />
                            <p>Calories</p>
                            <input id="addCaloriesInput" />
                            <button type="button" id="addBtn">Submit</button>
                        </form>
                    </div>
                    `)
                    toggle=true;  
                } else {
                    
                    $("#itemForm").detach();
                    toggle = false;
                }
                //current meal buttons

    // $("#currentMeal").append(
    //     `<div class="card">
            
    //     </div>
    //     `);

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
                        data:{
                            meal: [
                            { 
                                mealName: selectedMeal,
                                foodName: $("#addFoodInput").val(),
                                calories: $("#addCaloriesInput").val(),
                                comments: "testpost"
                            
                            }
                        ]
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
                <div class="row">
                    <div class="card foodRow" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${result.meal[i].foodName}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${result.meal[i].calories}</h6>
                            <p class="card-text">${result.meal[i].mealName}</p>
                        </div>
                    </div>
                </div>
                `)
            }
            
            
        
        }
    },
    error: function(err) {
        console.log(err)
    }
})


})
$(document).ready(function(){
    var username = sessionStorage.getItem("username")
    var day = sessionStorage.getItem("day")
    var date = sessionStorage.getItem("date") 
    var stamp = sessionStorage.getItem("stamp")
    var selectedMeal = "Breakfast"
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
                    mealName: selectedMeal,
                    foodName: $("#foodNameInput").val(),
                    calories: $("#caloriesInput").val(),
                    comments: "test"
                }
            }
        })
    })
})
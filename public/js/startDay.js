$(document).ready(function(){
    var username = sessionStorage.getItem("username")
    var day = sessionStorage.getItem("day")
    var date = sessionStorage.getItem("date") 
    var stamp = sessionStorage.getItem("stamp")
    var selectedMeal = "Breakfast"
    //current meal buttons

    $("#currentMeal").append(
        `
        <div class="card addItemForm">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="activeBtn" id="breakfastBtn">Breakfast</button>
                <button type="button" id="lunchBtn">Lunch</button>
                <button type="button" id="dinnerBtn">Dinner</button>
                <button type="button" id="snackBtn">Snack</button>
            </div>
            <form>
                <p>Food</p>
                <input id="foodNameInput" />
                <p>Calories</p>
                <input id="caloriesInput" />
                <a href="/summary/" class="btn" id="postDay">Submit</a>
            </form>
        </div>
    `);

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
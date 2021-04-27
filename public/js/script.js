$(document).ready(function(){

  let user = "testuser";

  let selectedDay = "";

  let selectedMeal = "Breakfast";

//Login Stuff - needs work
  $("#login").append(`<form>
        <p>Username</p>
        <input />
        <p>Password</p>
        <input />
        <button id="loginBtn">Login</button>
        </form>`);

    $("#loginBtn").on("click", function() {
        console.log("click")
    });

//Select Day
  $.ajax({
    type: "GET",
    url: `/week/`,
    success: function(result) {
      selectedDay = result;
      $("#selectDay").append(`
      <button id="yesterday">${result[0]}</button>
      <button id="today">${result[1]}</button>
      <button id="tomorrow">${result[2]}</button>`)
      $("#today").on("click", function() {
        selectedDay=result[1];
        $.ajax({
          type: "GET",
          url: `/food/${user}/${selectedDay}`,
          success: function(result) {
            if (result == []) {
              $("#isStarted").append(`<h3>Nothing Here</h3>
              <a href="/diary"><button>Begin Day</button></a>`)
            } else {
              $("#isStarted").append(`<div class="row"> Day: ${result[0].day}</div>`);
              for(var i = 0; i < result[0].meal.length; i++) {
                $("#isStarted").append(`<div class="row"> ${result[0].meal[i].foodName}`)
              }   
              $("#isStarted").append(`<a href="/diary/summary"><button>Add Food</button></a>`)
            }
          },
          error: function(err) {
            console.log(err);
          }
        });
      })
    },
    error: function(err) {
      console.log(err);
    }
  });

  
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

  //create day
  $("#postDay").on("click", function(){
    var input = $("#foodInput").val()
    console.log(input);
    $.ajax({
      type: "POST",
      url: "/food/post/",
      data: { 
          user: "testuser",
          meal: {
            mealName: selectedMeal,
            foodName: $("#foodNameInput").val(),
            calories: $("#caloriesInput").val(),
            comments: "test"
          }
      },
      success: function(result) {
          console.log("success");
      },
      error: function(result) {
          console.log("error");
      }});
      window.location.reload();
  });
  //get day of week to front end 

  $.ajax({
    type: "GET",
    url: `/day/`,
    success: function(result) {
      selectedDay = result;
      $("#currentDay").append(`<h5>${result}</h5`)

      //get today's list of food
      $.ajax({
        type: "GET",
        url: `/food/${user}/${selectedDay}`,
        success: function(result) {
          if(result == []) {
            $("#foodList").append(`<div class="row"> Nothing Here</div>`);
          } else {
            $("#foodList").append(`<div class="row"> Day: ${result[0].day}</div>`);
            for(var i = 0; i < result[0].meal.length; i++) {
            $("#foodList").append(`<div class="row"> ${result[0].meal[i].foodName}`)
          }
          }
          
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    error: function(err) {
        console.log(err);
    }
  });
  
  //Add Item to Day of food
  $("#addItem").on("click", function(e){
    e.preventDefault();
    $.ajax({
        type: "PUT",
        url: `/add/${user}/${selectedDay}/`,
        data: {meal: { 
            mealName: selectedMeal,
            foodName: $("#addFoodInput").val(),
            calories: $("#addCaloriesInput").val(),
            comments: "testpost"
        }},
        success: function(result) {
          console.log("Successfully added");
        },
        error: function(err) {
          console.log(err);
        }});
        window.location.reload();

    });

    console.log("day test: " + selectedDay)
    
});
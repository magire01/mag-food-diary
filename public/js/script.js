$(document).ready(function(){

  let user = "testuser";

  let day = "Sunday"

  
  $("#btnStart").on("click", function(){
    console.log("test123");
    $.ajax({
      type: "GET",
      url: "/diary/"
    })
  })
    
  $("#postDay").on("click", function(){
    var input = $("#foodInput").val()
    console.log(input);
    $.ajax({
      type: "POST",
      url: "/food/post/",
      data: { 
          user: "testuser",
          meal: {
            mealName: "Breakfast",
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

  

  $.ajax({
    type: "GET",
    url: `/food/${user}/`,
    success: function(result) {
      console.log(result)
      $("#foodList").append(`<div class="row"> Day: ${result[0].day}</div>`);
      for(var i = 0; i < result[0].meal.length; i++) {
        $("#foodList").append(`<div class="row"> ${result[0].meal[i].foodName}`)
      }
    },
    error: function(err) {
        console.log(err);
    }
  });

  $("#addItem").on("click", function(){
    $.ajax({
        type: "PUT",
        url: `/food/${user}/${day}/`,
        data: {meal: { 
            mealName: "Breakfast",
            foodName: $("#addFoodInput").val(),
            calories: $("#addCaloriesInput").val(),
            comments: "testpost"
        }},
        success: function(result) {
          console.log(result);
        },
        error: function(err) {
          console.log(err);
        }});
        window.location.reload();

    });

  
    
});
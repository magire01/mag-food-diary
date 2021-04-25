$(document).ready(function(){
    
    $("#btnTest").on("click", function(){
      var input = $("#foodInput").val()
      console.log(input);
      $.ajax({
        type: "POST",
        url: "/post/food/",
        data: { 
            foodName: $("#foodInput").val()
        },
        success: function(result) {
            console.log("success");
        },
        error: function(result) {
            console.log("error");
        }});
    });

    $.ajax({
      type: "GET",
      url: "/test/",
      success: function(result) {
        for(var i = 0; i < result.length; i++) {
          $("#foodList").append(`<div class="row">${result[i].foodName}</div>`);
        }
      },
      error: function(err) {
          console.log(err);
      }});


    
});
$(document).ready(function(){
    
    //selected day day
    let username = sessionStorage.getItem("username")
    let selectedDay = {
        dddd: "",
        l: "",
        stamp: null,
        selected: false
    }
    $.ajax({
        type: "GET",
        url: `/day/`,
        success: function(result) {
            console.log(result)
            $("#welcome").append(`
                <h3> Welcome ${username} </h3>
            `)
            $("#todayDate").append(`
                <button id="today">${result.day} ${result.date}</button>
                
            `)
            $("#today").on("click", function() {
                selectedDay.dddd = result.day;
                selectedDay.l = result.date;
                selectedDay.stamp = result.stamp;

                console.log(selectedDay)
            });

                for(let i = 0; i < result.week.dddd.length; i++) {
                    $("#selectDay").append(`
                        <a id="sumLink${i}" href=""><button id="${result.week.dddd[i]}Button"> ${result.week.dddd[i]} ${result.week.l[i]} </button></a>
                    `)


                    $(`#${result.week.dddd[i]}Button`).on("click", function() {
                        selectedDay.dddd = result.week.dddd[i];
                        selectedDay.l = result.week.l[i];
                        selectedDay.stamp = result.week.stamp[i];
                        //store user and stamp
                        //sessionStorage.setItem("username", username);
                        sessionStorage.setItem("day", selectedDay.dddd);
                        sessionStorage.setItem("date", selectedDay.l)
                        sessionStorage.setItem("stamp", selectedDay.stamp);

                    // $(`#sumLink${i}`).attr("href", `/summary/${username}/${result.week.stamp[i]}`)
                    $(`#sumLink${i}`).attr("href", `/summary/`)
                })

                
                }

        },
        error: function(err) {
            console.log(err);
        }
      });
});


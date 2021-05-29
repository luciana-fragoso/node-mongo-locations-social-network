$(document).ready(function(e) {
    let user_id = $("#main").data("user");
    
    var loggedIn = false;
    if (user_id !== ""){
        loggedIn = true;
    }
   
    var isLiked = $("#like").data("sit");
    
    if (isLiked){
        
        $("#like").css({"color":"green"});
        $("#like").hover(function() {
            $(this).css("color", "green");
        });
    }
    
    var isDisliked = $("#dislike").data("sit")
    
        if (isDisliked){
        $("#dislike").css({"color":"red"})
        $("#dislike").hover(function() {
            $(this).css("color", "red");
        });
    }
    
    $("#like").one("click", function(e) {
        
        if (!isLiked && loggedIn) {
        let location_id = $("#recommendations-id").data("id");
        let url = "../like"
        let user_id = $("#main").data("user");
        $.ajax({
            method: "POST",
            url: url,
            data: {location_id:location_id,user_id:user_id}
            })
        .done(function(response) {
          $("#numLikes").html(response.likes);
          $("#like").css({"color":"green"})
            }); 
        }
        });

         
        $("#dislike").one("click", function(e) {  
           if (!isDisliked && loggedIn) {
            let location_id = $("#recommendations-id").data("id");
            let url = "../dislike"
            let user_id = $("#main").data("user");
            $("#dislike").css({"color":"red"})
          
            $.ajax({
                method: "POST",
                url: url,
                data: {location_id:location_id,user_id:user_id}
                })
            .done(function(response) {
                
              $("#numDislikes").html(response.dislikes);
                }); 
            }
            });
      
        
});


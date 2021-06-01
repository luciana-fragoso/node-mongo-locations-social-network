$(document).ready(function(e) {
$("#change_password_link").on("click", function(e) {  
    $("#change_password").css({"display":"block"});
});



$("#change-btn").on("click",function(e) {
    e.preventDefault();
    var p1 = $("#password").val();
    var p2 = $("#password2").val();
    if (p1.trim() !== ""  && p2.trim() !== ""){
        if (p1 === p2){
            var url = "../changePassword";
            var user_id = $("#change_password_form").data("user");
            $.ajax({
                method: "POST",
                url: url,
                data: {user_id:user_id,password:p1}
                })
                .done(function(response) {
                    let message= `<p class="mt-2">`+response.message+`</p>`;
                    $("#change_password").css({"display":"none"});
                    $("#message").html(message);
                      }); 
        }
        else {
            let message= `<p class="mt-2">Passwords don't match</p>`;
            $("#message").html(message);
        }
    } else {
        let message= `<p class="mt-2">Boths values are required</p>`;
        $("#message").html(message);
    }
  });

});


  
$( document ).ready(function() {

    $("#search").on('keyup change',function(e) {search(e); });

    
    
    const search = function(e) {
        e.preventDefault();
        var searchResults = [];
     
        $("#search-results").empty();
       
        if ($("#search").val().length >= 3) {
            if (e.keyCode === 13){
                inputSearch = $('#search').val();
                search_function(e);
        } else {
        inputSearch = $('#search').val();
        
            
        var url = "../searchLocation/"+inputSearch;

        $.ajax({
            method: "GET",
            url: url
            })
        .done(function(response) {
            for (var i=0;(i<6) && i<response.length;i++){
                    showObj = {};
                    showObj.id = response[i]._id;
                    showObj.title = response[i].title;
                    showObj.description = response[i].description;
                    showObj.image_url = response[i].image_url;
                    searchResults.push(showObj);
                    console.log(showObj)    
            }
            
            searchResults.forEach(function(currentMatch,index) {   
                $("#search-results").append(
                    "<div class='d-flex w-100 each-show'>"+
                    "<div class='show-search-image'>"+
                    "<a href='../seeLocation/"+currentMatch.id+"'><img class='very-small-icon' src='/images/"+currentMatch.image_url+"' alt='"+currentMatch.title+" icon' /></a></div>"+
                    "<div class='show-search-list'>"+
                    "<a class='d-block text-secondary' href='../shows/"+currentMatch.id+"'>"
                    +currentMatch.title+"</a></div></div>");     
                })
                $("#search-results").css({ display: "block" });
            });

         
        }   
       
    }  
}
}); 
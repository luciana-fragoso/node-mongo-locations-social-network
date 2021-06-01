$( document ).ready(function() {

    
    $("#search-button").on('click',function(e) {search_function(e); });
    $("#search").on('keyup',function(e) {search(e); });

    
    
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
                locationObj = {};
                locationObj.id = response[i]._id;
                locationObj.title = response[i].title.charAt(0).toUpperCase() + response[i].title.slice(1); //Capitalizing first letter
                locationObj.description = response[i].description;
                locationObj.image_url = response[i].image_url;
                    searchResults.push(locationObj);
              
            }
            
            searchResults.forEach(function(currentMatch,index) {   
                $("#search-results").append(
                    "<div class='d-flex w-100 bg-light each-show'>"+
                    "<div class='show-search-image'>"+
                    "<a href='../location/"+currentMatch.id+"'><img class='very-small-icon' src='/images/"+currentMatch.image_url+"' alt='"+currentMatch.title+" icon' /></a></div>"+
                    "<div class='show-search-list'>"+
                    "<a class='d-block text-danger' href='../location/"+currentMatch.id+"'>"
                    +currentMatch.title+"</a></div></div>");     
                })
                $("#search-results").css({ display: "block" });
            });

         
        }   
       
    }  
}

//* events to close the search result */
$('input[type=search]').on('search', function () {
    $("#search-results").empty();
    $("#search-results").css({ display: "none" });
});

$(window).click(function(e) {
    if (!e.target.id !== "#search-results")  {
    $("#search-results").empty();
    $("#search-results").css({ display: "none" });
    }
});

$(window).on('wheel', function(e){
    var container = $("#search-results");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $("#search-results").empty();
        $("#search-results").css({ display: "none" });
    }
  });

  function search_function(e){
    var searchResults = [];
      e.preventDefault();
      
      inputSearch = $('#search').val();
        
            
      var url = "../searchLocation/"+inputSearch;

      $.ajax({
          method: "GET",
          url: url
          })
      .done(function(response) {
          
          for (var i=0;(i<6) && i<response.length;i++){
                  locationObj = {};
                  locationObj.id = response[i]._id;
                  locationObj.title = response[i].title.charAt(0).toUpperCase() + response[i].title.slice(1); //Capitalizing first letter
                  locationObj.description = response[i].description;
                  locationObj.image_url = response[i].image_url;
                  locationObj.numLikes = response[i].numLikes.length;
                  locationObj.numDislikes = response[i].numDislikes.length;
                  locationObj.numComments = response[i].comments.length;
                  searchResults.push(locationObj);
                  
                  
                 
          }
          console.log(searchResults);
          $("#main").empty();
          let html = `<ul class="show-list">`;
          searchResults.forEach(function(currentMatch,index) {  
            let url = "../location/"+currentMatch.id; 
            html += `<li class="each-location-card mb-3">
                        <div class="card card-index">
                            <a class="text-decoration-none" href=`+url+`> <img class="card-img-top"  src="/images/`+currentMatch.image_url+`" id="image-`+currentMatch.id+`" alt="Image of `+currentMatch.title+`></a>
                            <div class="card-body">
                                <a class="text-decoration-none" href=`+url+`><h4 class="location-title text-dark font-weight-bold mt-2">`+currentMatch.title.charAt(0).toUpperCase()+currentMatch.title.slice(1)+`</h4></a>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex">
                                    <div class="likes-index">
                                        <span><i class="fa fa-thumbs-up text-dark"></i>`+currentMatch.numLikes+`</span>
                                        <span><i class="ml-3 fa fa-thumbs-down text-dark"></i>`+currentMatch.numDislikes+`</span>
                                    </div>
                                    <div class="comments-index">
                                    <span class="float-right"><i class="fa fa-comments text-dark"></i>`+currentMatch.numComments+`</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
            `;
          
        });
        $("#main").append(html);
          
        });
    }
    

  


}); 
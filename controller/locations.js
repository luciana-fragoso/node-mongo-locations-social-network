
const UserController = require("./user")
const Location = require ('../model/location');
const User = require("../model/user");
const util = require("../util/check")






exports.seeLocation = async (req, res) => {

var user_id = navbarCheck(req.headers.cookie);

var likes = false, dislikes = false;

if (user_id !== null){
  likes = await util.checkUserLikes(req.params.id,user_id);
  dislikes = await util.checkUserDislikes(req.params.id,user_id);
}
 
  
    await Location.findById(req.params.id)
    .exec()
    .then(async loc => {
      if (loc) {
       
          if (loc.comments.length > 0 ){
            var comments = []
            
            for (var i=0;i<loc.comments.length;i++){
              var username = await UserController.getUsername(loc.comments[i].user_id);
              
              comments.push({author:username,comment:loc.comments[i].comment,author_id:loc.comments[i].user_id})
            }
          }
          
        res.render("pages/see_location",{loc:loc,comments:comments,liked:likes,disliked:dislikes,user_id:user_id})
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  
  }

  exports.newLocationPost =  async (req, res) => {
    var image = req.file.path.slice(6);
    var loc = req.body;
 
    var user_id = navbarCheck(req.headers.cookie);

    var newLocation = new Location({
      title: loc.title.toLowerCase(),
      description: loc.description,
      image_url: image,
      user_id : user_id,
      isApproved: false },
      );
      
    newLocation
    .save()
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

   
  }

  exports.newLocation = async (req, res) => {
    
    
    if (req.headers.cookie === undefined) {
      res.send("not logged in")
    } else {     
      var user_id = navbarCheck(req.headers.cookie);
      var isAdmin;
      if (user_id !== null){
        var isAdmin = await checkAdmin(user_id);
      }
      res.render("pages/new_location",{user_id:user_id,isAdmin:isAdmin});
    }
    
  }

  exports.searchLocation = async (req, res) => {
    let title = req.params.searchInput;
    

    await Location.find({"title":{$regex : "(?i).*"+title+".*"}})
    .exec()
    .then(loc => {
      
      if (loc) {
    
        res.send(loc);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      
      res.status(500).json({ error: err });
    });
   
  }


  exports.newComment = async (req, res) => {

    let token = req.headers.cookie.slice(7);
    var user_id = util.isLogged(token);

    var location_id = req.body.location_id;
    
    
    var comment = req.body.comment;
    var user_name;
    var new_comment = {"user_id":user_id,"comment":comment};
   
    await User.find({"_id":user_id})
    .exec()
    .then(u => { 
      if (u) {
        user_name = u[0].name;
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
    await Location.findOneAndUpdate({"_id":location_id},{$push:{"comments" : new_comment}})
    .exec()
    .then(loc => {
      
      res.send({comment:comment,author:user_name,author_id:user_id});
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err });
    });
  }

  exports.newLike = async (req, res) => {

    let token = req.headers.cookie.slice(7);
    var user_id = util.isLogged(token);
    var location_id = req.body.location_id
   
   await Location.findOneAndUpdate({"_id":location_id},{$push:{"numLikes":user_id}})
   .exec()
    .then(loc => {
      res.send({likes:loc.numLikes.length+1});
    })
    .catch(err => {
      console.log("errro")
      res.status(500).json({ error: err });
    });
  }


  exports.newDislike = async (req, res) => {

    let token = req.headers.cookie.slice(7);
    var user_id = util.isLogged(token);
    var location_id = req.body.location_id
  
  
    await Location.findOneAndUpdate({"_id":location_id},{$push:{"numDislikes":user_id}})
    .exec()
     .then(loc => {
       res.send({dislikes:loc.numDislikes.length+1});
     })
     .catch(err => {
       console.log(err)
       res.status(500).json({ error: err });
     });
     
   }

   

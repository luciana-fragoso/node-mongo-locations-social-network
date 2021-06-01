const Location = require ('../model/location');
const User = require ('../model/user');
const util = require("../util/check")

exports.homepage = async (req, res) => {
  

  Location.find({isApproved:true})
  .exec()
  .then(async result => {
    var isAdmin;
    var user_id = navbarCheck(req.headers.cookie);
    if (user_id !== null){
      
      isAdmin = await checkAdmin(user_id);
    }
    res.render("pages/index",{locations:result,user_id:user_id,isAdmin:isAdmin}); 
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.login = async (req, res) => {
  var user_id = navbarCheck(req.headers.cookie);
  res.render("pages/login",{user_id:user_id}); 
}


  exports.signup = async (req, res) => {
    var user_id = navbarCheck(req.headers.cookie);
    res.render("pages/register",{user_id:user_id});
  }


  exports.userPage = async (req, res) => {
    var user_id = req.params.id;
    var isAdmin;
    var user_id_cookies = navbarCheck(req.headers.cookie);
    if (user_id_cookies !== null){
      isAdmin = await checkAdmin(user_id);
    }
    
    var loggedInUser = false;
    if (user_id === user_id_cookies){
      loggedInUser = true;
    }
    await User.findById(user_id)
    .exec()
    .then(user => {  
      
      res.render("pages/myProfile",{user:user,changePassword:loggedInUser,isAdmin:isAdmin});
     })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
    
  }

  exports.adminPage = async (req, res) => {
    
    Location.find()
  .exec()
  .then(async result => {

    var user_id = navbarCheck(req.headers.cookie);
    var isAdmin 
    if (user_id !== null){
      isAdmin = await checkAdmin(user_id);
    }
    
    if (isAdmin){
      res.render("pages/adminPage",{locations:result,user_id:user_id,isAdmin:isAdmin}); 
    } else {
      res.redirect("/");
    }
   
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}
  
exports.approveLocation = async (req, res) => {
  
  let doc =await  Location.findOneAndUpdate({"_id":req.body.id},{"isApproved" : true})
  await doc.save()
  res.send("done")

}

  
    
  
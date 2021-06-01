const Location = require ('../model/location');
const User = require ('../model/user');
const util = require("../util/check")

exports.homepage = async (req, res) => {
  
  Location.find()
  .exec()
  .then(result => {

    var user_id = navbarCheck(req.headers.cookie);
    
    res.render("pages/index",{locations:result,user_id:user_id}); 
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
    var user_id_cookies = navbarCheck(req.headers.cookie);
    var loggedInUser = false;
    if (user_id === user_id_cookies){
      loggedInUser = true;
    }
    await User.findById(user_id)
    .exec()
    .then(user => {  
      
      res.render("pages/myProfile",{user:user,changePassword:loggedInUser});
     })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
    
  }

  
    
  
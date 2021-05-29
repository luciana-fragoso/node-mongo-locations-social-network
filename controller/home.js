const Location = require ('../model/location');
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


  exports.myProfile = async (req, res) => {
    res.send("My Profile page");
  }

  
    
  
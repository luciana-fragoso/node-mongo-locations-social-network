const Location = require ('../model/location');


exports.homepage = async (req, res) => {
  
  Location.find()
  .exec()
  .then(result => {
    res.render("pages/index",{locations:result}); 
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.login = async (req, res) => {
    res.send("Login page");
}


  exports.signup = async (req, res) => {
    res.send("Sign up page");
  }

   exports.logout = async (req, res) => {
    res.send("Logout page");
  }

  exports.myProfile = async (req, res) => {
    res.send("My Profile page");
  }

  
    
  
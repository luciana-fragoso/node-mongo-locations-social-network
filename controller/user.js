const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function validatePassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword,hashedPassword);
}
exports.signup = async(req,res)=>{
    const {name, email, password,password2} = req.body;
    if (password !== password2){
      res.render("pages/register",{msg:"Passwords don't match"}); 
    }
    else {
    try {
        let user = await User.findOne({"email":email});
        if (user) {
              res.render("pages/register",{msg:"E-mail not available"}); 
        }
        else {
          var role = "user";
          user = new User({
            name,
            email,
            password,
            role,
           });
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
           await user.save();    
           res.redirect(307,"/login");
          }
        }
        
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
  }
    };
    
    exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({"email":email });
     if (!user) {
      res.render("pages/login",{msg:"User not found"});
     }
     else {
      const validPassword = await validatePassword(password, user.password);
      if (!validPassword) {
        res.render("pages/login",{msg:"Wrong password",user_id:null});
        
       }
       
       else {
      
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d"});
      res.cookie('nToken', accessToken, { httpOnly: true});
      if (user.role === 'admin')
        res.redirect("/adminPage");
      else
       res.redirect("/");
       
  
       }
     }
     
     
       
     
    } catch (error) {
     next(error);
    }
}




exports.getUsername = async function(user_id){
  var username;
  await User.findById(user_id)
  .exec()
  .then(user => {
    username = user.name;
    
      
  })
  .catch(err => {
      console.log(err);
      return(err);
    });
  
    return username;
  };


  exports.logout = (req,res) => {
    res.clearCookie('nToken');
    res.redirect('/');
};


    
exports.changePassword = async (req,res) => {
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  await User.findOneAndUpdate({"_id":req.body.user_id},{"password":hashedPassword})
  .exec()
  .then(loc => {
    res.send({message:"Password changed"});
    
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: err });
  });
}
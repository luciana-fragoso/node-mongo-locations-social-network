const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function validatePassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword,hashedPassword);
}
exports.signup = async(req,res)=>{
    const {name, email, password, role} = req.body;
    try {
        let user = await User.findOne({ email});
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
          user = new User({
            name,
            email,
            password,
            role
           });
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
           await user.save();
           var userLogin = {email,password};
    
           res.redirect(307,"/login");
     
        }
        
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
    };
    
    exports.login = async (req, res, next) => {
      console.log(req.body);
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(new Error('Auth failed'));
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(new Error('Auth failed'))
     
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"});
    res.cookie('nToken', accessToken, { httpOnly: true});
    
       res.redirect("/");
     
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


    

const Location = require ('../model/location');
const User = require ('../model/user');
const jwt = require('jsonwebtoken');




checkUserLikes = async function(location_id,user_id){
    var userLiked;
   await Location.findById(location_id)
   .exec()
   .then(loc => {
    userLiked = loc.numLikes.includes(user_id);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  return userLiked;
}

checkUserDislikes =  async function(location_id,user_id){
    var userDisliked;
    await Location.findById(location_id)
    .exec()
    .then(loc => {
        userDisliked = loc.numDislikes.includes(user_id);
    })
    .catch(err => {
     console.log(err);
     res.status(500).json({ error: err });
   });
   return userDisliked;
}


isLogged = function(token){
  var user_id = null;
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    user_id = decoded.userId;
  } catch {
    return null;
  }
  
  return user_id;
  
}

navbarCheck = function(cookie){
  var user_id = null;
  if (cookie !== undefined) {
    let token = cookie.slice(7);
    user_id = isLogged(token);
  } 

  return user_id;
}

checkAdmin = async function(user_id) {
  var isAdmin = false;
   await User.findById(user_id)
   .exec()
   .then(user => {
     if (user.role === "admin"){
       isAdmin = true;
     }
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  return isAdmin;
}
module.exports = { checkUserDislikes, checkUserLikes, isLogged , navbarCheck ,checkAdmin }
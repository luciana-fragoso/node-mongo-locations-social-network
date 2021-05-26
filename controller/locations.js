

const Location = require ('../model/location');



exports.seeLocation = async (req, res) => {
    Location.findById(req.params.id)
    .exec()
    .then(loc => {
      
      if (loc) {
        res.render("pages/see_location",{loc:loc})
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  
  }

  exports.newLocationPost = async (req, res) => {

    var loc = req.body;
    console.log(loc.image);
    var newLocation = new Location({
      type: loc.type,
      title: loc.title.toLowerCase(),
      description: loc.description,
      image_url: loc.image,
      user_id : "1"});
 
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
    res.render("pages/new_location");
  }

  exports.searchLocation = async (req, res) => {
    let title = req.params.searchInput;
    console.log(title);

    Location.find({"title":{$regex : "(?i).*"+title+".*"}})
    .exec()
    .then(loc => {
      
      if (loc) {
        res.send(loc);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
   
  }
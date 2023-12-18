var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local")

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get("/profile", isLoggedIn, function(req, res) {
  res.render('profile');
});


router.post("/register", function (req, res) {
  var userdata = new userModel({
    usename: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password)
  .then(function (registereduser) {
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile');
    });
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res){})

router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if(err) return next (err);
      res.redirect("/");
    
  })
});

// if you 

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {   // it means if you are logged in go forward if you are not logged in then go back to "/"
    return next();
  }
  res.redirect("/");
}

// router.get("/failed", function(req, res) {
//   req.flash("age", 18)
//   req.flash("name", "asim")
//   res.send("it's ready");
// });

// router.get("/checkkaro", function(req, res) {
//   console.log(req.flash("age"), req.flash("name"));
//   res.send("check karlo backend ke terminal per");
// });

// router.get("/create", async function(req, res) {
//  let userdata = await userModel.create({
//     username: "harshi",
//     nickname: "harshiii",
//     description: "hey bro",
//     categories: ["playing", "reading", "fashion"],
//   });
//   res.send(userdata);
// });

// ? How can I perform a case-insensitive search in Mongoose?

// router.get("/find", async function(req, res) {  // finding one name from an array
//   var regex = new RegExp("^HARSH$", "i");
//   let userOne = await userModel.find({username: regex});
//   res.send(userOne);
// });

// ? How do I find documents where an array field contains all of a set of values?

// router.get("/find", async function(req, res) {
//   let user = await userModel.find({categories: {$all: ["fashion", "makeup"]}});
//   res.send(user);
// });

// ? How can I search for documents with a specific date range in Mongoose?

// router.get("/find", async function(req, res) {
//   var date1 = new Date("2023-12-12");
//   var date2 = new Date("2023-12-13");
//   let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}})
//   res.send(user);
// });

// ?  How can I filter documents based on the existence of a field in Mongoose?

// router.get("/find", async function(req, res) {
//   let user = await userModel.find({categories: {$exists: true}})
//   res.send(user);
// });

// ?  How can I filter documents based on a specific field's length in Mongoose?
// ! $gte maeans >=  and $lte means <=

// router.get("/find", async function(req, res) {
//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         {$gte: [{$strLenCP: '$nickname'}, 0]},
//         {$lte: [{$strLenCP: "$nickname"}, 8]}
//       ]
//     }
//   });
//   res.send(user);
// });


//?  ___________________________  Authentication and Authorization  _________________________________

module.exports = router;

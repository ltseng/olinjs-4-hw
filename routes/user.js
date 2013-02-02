var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
});

var User = mongoose.model('User', userSchema);

var tweetSchema = mongoose.Schema({
	name: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	tweets: [String]
});

/*
 * GET users listing.
 */


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.newUser =  function(req,res){
	var user_name = req.body.user_name;
	var new_message = "Uneventful";
	
	User.find({name: user_name}).exec(function(err, found){
		if (err){
			console.log(err);
		}
		if (found.length == 0){
			new_message = "New user, making you an account";
			new_user = new User({name: user_name});
			new_user.save(function (err){
				if (err){
					new_message = "Error";
					return console.log(err);
				}
			}); 
			req.sessions.user = req.param(new_user);
		} else if (found.length > 0){
			new_message = "Welcome, " +user_name+ ", we're logging you in";
			req.sessions.user = found;
			console.log("Set User Session");
		}
		res.render('new_user', {message: new_message});
	});
	var address = '/users/' + user_name;
	res.redirect(address);	
};


exports.myTweets = function(req, res){
	//var current_user = req.sessions.user; 
	//name = current_user.name;
	console.log(req.params.user);
	res.render('YourTweets', {current_name: "You're here!"});

}
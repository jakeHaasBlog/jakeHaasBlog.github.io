// blogspace is the div that should be modified
// blog object must have run function
// blog object must be pudhed into blogPages array


var blog4HTML = 
 "<h1 style='text-align: center; width: 100%; color: #bd9b16; margin-bottom: 0;'>IT HAS BEEN FOUND!!!</h1>"
+"<h3 style='text-align: center; width: 100%; color: #bd9b16; margin-top: 0;'>My ASCII Game</h3>"
+""
+"	<a href='ASCII_Game.jar' download>My ASCII Game</a>"
+""
+"</style>"

var blog3 = {

	loop: function(){

	},

	run: function(){

		blogspace.style.background = '#080808';
		blogspace.style.borderStyle = 'groove';
		blogspace.style.borderColor = '#bd9d16';
		blogspace.innerHTML = blog4HTML;

	}
}

blogPages.push(blog3);
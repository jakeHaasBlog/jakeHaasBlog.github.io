// blogspace is the div that should be modified
// blog object must have run function
// blog object must be pudhed into blogPages array


var blog3HTML = 
 "<h1 style='text-align: center; width: 100%; color: #bd9b16'>My New Laptop Section</h1>"
+""
+""
+""
+""
+""

var blog3 = {

	run: function(){

		blogspace.style.background = '#080808';
		blogspace.innerHTML = blog3HTML;

	}
}

blogPages.push(blog3);
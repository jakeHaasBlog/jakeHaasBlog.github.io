
// blogspace is the div that should be modified
// blog object must have run function
// blog object must be pudhed into blogPages array


var blog1HTML = 
 "<h1 style='color: #ff1500; display: block; text-align: center; margin: auto; margin-top: 20px;'>My Blog Section!</h1>"
+"<h3 style='color: #ff5500; margin-left: 50px;'>Things to know!</h3><br>"
+"<ul>"
+"<li>I have one page that is hidden like in a hidden room, and if you find it you will get a prize! (not really but you can be proud of yourself! :D)</li>"
+"<li>These blogs are created using javascript so I can add literally anything to them.. Be warned.</li>"
+"<li>This blog will be filled with my personal experiences and random stuff I feel like adding so tread lightly!</li>"
+"<li>Finally, the dna strand at the top can be used to scroll through my timeline starting here(the first ever post), and ending at the most recent post!(also the dna uses about 40% of my laptops cpu so you can turn it off with the checkbox on this screen!)</li>"
+"</ul>"
+""
+"<input type='checkbox' id='runDNAbutton'>"
+""
+"<style>"
+"li{"
+"	color: #ff9500;"
+"}"
+"</style>"
+""


var blog1 = {

	loop: function(){

		try {
		if (document.getElementById('runDNAbutton').checked) runDNA = true;
		else runDNA = false;
		} catch (e){}

		if (currentPageNumber == 1) window.requestAnimationFrame(blog1.loop);
	},

	run: function(){

		blogspace.style.background = '#111';
		blogspace.innerHTML = blog1HTML;
		document.getElementById('runDNAbutton').checked = runDNA;

		this.loop();

	}
}

blogPages.push(blog1);
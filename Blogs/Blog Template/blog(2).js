
// blogspace is the div that should be modified
// blog object must have run function
// blog object must be pudhed into blogPages array


var blog2HTML = 
 "<h1 style='text-align: center; color: #abc;'>Cat Section! I love cats BTW! :3</h1>"
+"<div id='maindiv'>SO, I have a cat named Albi, and he is a majestic creature. This brings me to an important question, a question that has made and broken friendships, and been the start of many controvercies.<br>"
+"--- Cats or Dogs? ---<br>"
+"While many people feel the need to pick a side I dissagree, having never had a dog before I don't really see the appeal. But many friends of mine enjoy having a dog so.. meh."
+" Cats are the easiest to care for, the only 'matinence' my cat requires is occasionally pouring food into a bowl so it alway contains some food."
+" Other than that we let it outside to use the washroom, on vacations we toss it outside and leave, and we have never taken it to the vet."
+" That being said, maininence is not the most important thing about a pet. Many people enjoy the energy that dogs have, but I prefer the calm nature of cats; they don't jump on people or bark when you open the door, and they are content to sleep on your face for as long as you allow."
+"But if you want to take a cat for a walk, or play frisbee with it, good luck. Other than purring, rubbing against your leg and occasionally sleeping on you, cats don't really do much."
+"Dogs on the other hand require constant attention, and need stimulation and play time to let out their excess energy, this can mean teaching it tricks or, playing fetch, or really anything you want."
+"<br><br>"
+"Conclusion: They're both pretty awesome!<br><br>"
+""
+"This is my cat Albi by the way:"
+"<img src='Blog Template/albi.jpg' style='width: 100%;'><br>"
+"He is a cow cat, which is hillarious! He would probably hate me if he could understand english."
+"<br>"
+"This photo was also taken on my phone so the quality is not the greatest, but I think the adorableness is communicated pretty well!"
+"<br><br>"
+"</div>"
+""
+""
+""
+""
+""
+""
+""
+""
+"<style>"
+"   #maindiv{"
+"   display: block;"
+"   color: #fff;"
+"   width: 96%;"
+"   margin-left: 2%;"
+"}"
+"</style>"

var blog2 = {

	run: function(){
		
		blogspace.innerHTML = blog2HTML;

	}
}

blogPages.push(blog2);
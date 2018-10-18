// blogspace is the div that should be modified
// blog object must have run function
// blog object must be pudhed into blogPages array


var blog4HTML = 
 "<h1 style='text-align: center; width: 100%; color: rgb(0, 255, 255); margin-bottom: 0;'>IT HAS BEEN FOUND!!!</h1>"
+"<h3 style='text-align: center; width: 100%; color: rgb(0, 255, 255); margin-top: 0;'><a href='ASCII_Game.jar'  download>My ASCII Game</a></h3>"
+""
+""
+" <div style='color: rgb(0, 200, 255); display: block; margin-left: 2%; width: 96%;'>"
+"   So, when I learned how to code the programing language I started with was Python, but I soon moved on to bigger, and better things! Like C++ *facepalm, I was an idiot. But either way, before I made anything cool with it I started my first computer science class in grade 11, and I had heard that we would be using Java, so I learned Java."
+" After hardcore studyinng for a full week any burning out my retinas, I decided my knowlege was good enough(we hadn't even started programing in my class yet)."
+" So, needless to say that I had a kinda HUGE advantage ofer the people who had never written a line of code in their life, and when we FINALLY got to programing I was very underwelmed. Note also, that this was basically an online course with a teacher in the room, so I had the ability to finnish every program for the entire year EXTREMELY early on."
+" Im sure you get the picture, I had a lot of free time on my hands, which was nice. I finished homework for other classes, and really just sat there talking to my friends the whole time. Enter: Ryan, the only other capable person in the class."
+" Me and Ryan get along very well, a lot of my other friends are goofy, and just try to annoy me all the time but Ryan is extremely kind, and respectfull to me."
+" Hi Ryan ;). Anyway, when we were getting close to the end of the year he had mentioned that he wanted to make a game, somthing that I had a creative approach to(that covered up the fact that I knew literally nothing about java graphics)"
+" I suggested that we make an ASCII game, in which everything was represented with letters for <i>styleization</i>. We made arrays to store a grid of ASCII chars then displayed them using html in a JLabel on a JFrame in Java."
+" This is the least efficient way to possibly ever display our games but hey, thats all we knew at the time, and it worked perfectly well!"
+" I made an rpg game and Ryan decided to remake snake. This went very well, I worked on it every day for about a month durring the time I wasn't helping the other people in my class, or being distracted by someone else."
+" This resulted in a pretty good game if I say so myself, but it was still being displayed on a JLabel, which was horrible.. I got the game to a point that I thought was pretty good and stopped working on it for a while."
+" When I returned to it in the last week of school I had gained a small degree of profficiency with Java graphics and decided to display it on the JFrame using an overritten paint method."
+" HOLY CRAP YOU SHOULD HAVE SEEN THE FRAMES!!! It was actually rediculous, the differece in the frame rate was actually stupid. Before I was running the game as frast as it could possibly run on my computer"
+", but after converting it to graphics I was forced to limit the frame rate by a rediculous amount! Without the limiter the character would 'teleport' across the entire map, ocean to ocean."
+" <br><br>"
+"So, now the inspiration for this section. I recently got a new computer, the same computer that was shown in the previous section in fact, and I had promissed Ryan that I would give him my old"
+" laptop so he could scrap it for pieces(it was badly dammaged), and I THOUGHT that I had gotten all of my important files off of it before giving it to him, but apparently I forgot to get this"
+" ASCII game. I realized that I didn't have my game about a week after giving him the computer and I was telling him about it one day and he apparently had an old copy of it! :D I was very happy this!"
+" But unfortunately I still didn't have the source code for it, and the game refused to run on my machine. Fast forward about two weeks, I had found a slightly shady website that claimed it could "
+" 'decompile' the jar file my game was in, and give me the source code. And it worked, to my surprize, perfectly!"
+"<br><br>"
+"This game was actually the first item to ever be posted in this blog tab, and was just a link with no explanation. To download, and play it you need to have java downloaded on your device(chances are you already have it without being aware)"
+"Once you have java installed just click the white link under the title to download the JAR file, from there right click the file and select open with - java runtime environment."
+""
+"<img src='Blog Template/asciiThumbnail.PNG' style='width: 80%; margin-left: 10%;'>"
+""
+"</div>"
+""
+"</style>"

var blog3 = {

	loop: function(){

	},

	run: function(){

		blogspace.style.background = '#080808';
		blogspace.style.borderStyle = 'dashed';
		blogspace.style.borderColor = 'green';
		blogspace.innerHTML = blog4HTML;

	}
}

blogPages.push(blog3);
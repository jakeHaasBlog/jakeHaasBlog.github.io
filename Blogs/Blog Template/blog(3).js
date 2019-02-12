// blogspace is the div that should be modified
// blog object must have run function
// blog object must be pudhed into blogPages array


var blog3HTML = 
 "<h1 style='text-align: center; width: 100%; color: #bd9b16; margin-bottom: 0;'>My New Laptop Section</h1>"
+"<h3 style='text-align: center; width: 100%; color: #bd9b16; margin-top: 0;'>Hp Spectre</h3>"
+""
+"<div id='maindiv'>"
+""
+"	<img id='compImg' style='display: block; margin: auto; width: 48%; height: auto;' src='https://product-images.www8-hp.com/digmedialib/prodimg/lowres/c05972398.png'>"
+""
+"	<div style='display: block; width: 100%; height: 30px;'>"
+"		<input id='image1' type='radio' name='imageSwitch'><input id='image2' type='radio' name='imageSwitch'>"
+"	</div>"
+""
+"	<div style='display: block; width: 100%; height = auto; background: #111;'>"
+"		<div style='display: inline-block; margin-left: 5%; margin-right: 5%; margin-top: 10px; margin-bottom: 20px; width: 40%; height: auto;'>"
+"			- intel I7 8550U (1.8 - 4.0gHz) cpu <br>"
+"			- NVIDEA GeForce MX150 (2 GB GDDR5) graphics<br>"
+"			- 15.5\" 4k IPS touch screen (3840 x 2160)"
+"		</div>"
+""
+"		<div style='display: inline-block; margin-left: 5%; margin-right: 5%; margin-top: 10px; margin-bottom: 20px; width: 40%; height: auto; float: left;'>"
+"				- 16GB DDR4-2400 SDRAM (2x8GB)<br>"
+"				- 512GB PCIe NVMe M.2 SSD"
+"		</div>"
+"	</div>"
+""
+"	<br><br>So i've been in the market for a new computer for about three months now and I have had quite the journey. Before starting the search I had almost no background knowledge about computer hardware because i'm more of a software guy."
+" I started by looking at laptops in my price range (about $2000) and started from the top, first was the processor. I found that as far as processors are concerned their are two main brands:"
+" Intel, and AMD. Intel tends to be more popular, and there processors are spit into three main catigorys; i3, i5, and i7. The i3 processors are kinda the bottom of the barrel as far as processors are concerned, i5's are the middle ground and provide good speed while consuming little energy, "
+"and i7's are power hungry, and the generally the most powerfull (note that the best i5 will be faster than the worst i7)."
+"To my surprize alot of laptops don't come with dedicated graphics cards and instead have intigrated graphics cards known as APU's which are much slower."
+"<br><br>"
+"Another majour factor when picking a laptop is deciding if you want a two-in-one. A two-in-one is a laptop with the ability to flip the screen fully backwards so it rests on the bottom of the keyboard."
+" These laptops come with a touch screen and generally have lower quality components because they have to fit in a smaller area, and the display is more expensive."
+" After looking at a bunch of laptops and reviews I decided that the two-in-one functionality is somthing I was interested in, so I could do some graphic design with a pen on the touch screen."
+" I was originally looking at the hp website because I currently have an hp and it has worked perfectly for me for the past 6 years."
+" The hp website is AWEFULL! It has multiple computers computers listed under the same name with different prices and specs. Only after looking for about 4 weeks did I realize that they had a section for ordering custom laptops."
+""
+"<br><br>"
+""
+"The next thing to consider is the amount of storage you need, and what type of storage you should get."
+" Older computers used to come with HDD(hard disk drives) that had a phisical disk inside them that would spin and be physically engraved by a lazer to store data. "
+"These drives are very slow, and often cause bottlenecks in computers, new computers often come with SSD(solid state drives) that are extremly quick but are expensive."
+" SSDs are so fast in fact that the way it is connected to your computer is what determines how quickly they can move data."
+" SSDs come with a few options, they can be connected through PCIe which is like a highway for data to move through your computer, NVME is another thing that can connect your SSD to your device and stands for non-volitile-memory-express, this is a very, very fast connection."
+" The final thing to know is what way the SSD is physically made, most SSDs use SATA, but newer ones are M.2(M dot 2) which is even faster."
+" I opted for a 512Gb PCIe NVME M.2 SSD for its speed, relitive affordability, and storage space. (Note that ssds break down over time and degrade slower when they are holding less data)"
+""
+"<br><br>"
+"</div>"
+""
+""
+""
+"<style>"
+"	#maindiv{"
+"		display: block;"
+"		color: #bd9b16;"
+"		width: 96%;"
+"		margin-left: 2%";
+"	}"
+""
+"	input {"
+"		display: inline-block;"
+"		vertical-align: top;"
+"	}"
+""
+"</style>"

var blog3 = {

	loop: function(){

		var then = new Date().getTime();
		var frameInterval = 1000/25; // 25fps

		if (document.getElementById('image1').checked == true){
			document.getElementById('compImg').src = 'https://product-images.www8-hp.com/digmedialib/prodimg/lowres/c05972398.png';
		} else {
			document.getElementById('compImg').src = 'https://zdnet3.cbsistatic.com/hub/i/r/2018/06/22/b7967d8b-7907-452a-93b2-ac7432cc5dfe/resize/570x428/8cff3c172d0550ea1370618ea04c84dc/laptops-best-battery-life-hp-spectre-x360-laptop.png';
		}

		while (then - new Date().getTime() > frameInterval){
			// do nothing
		}
		if (currentPageNumber == 3) window.requestAnimationFrame(blog3.loop);
	},

	run: function(){

		blogspace.style.background = '#080808';
		blogspace.style.borderStyle = 'groove';
		blogspace.style.borderColor = '#bd9d16';
		blogspace.innerHTML = blog3HTML;

		document.getElementById('image1').checked = true;

		this.loop();

	}
}

blogPages.push(blog3);
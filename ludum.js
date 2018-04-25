//DISCLAIMER: This game is inspired by theologies and popular culture from around the world.
//The views expressed in this fictional work are not those of the individuals who created it.
//Any likeness to persons living or dead in this work are purely coincidental.

var screen = document.getElementById('phoneScreen'),
	timeStatus = document.getElementById('statusBar'),
	timeStatusBar = document.getElementById('phoneStatus'),
	display = document.getElementById('appScreen');

window.onkeyup = function(e) {
	if(e.keyCode == 83) {
		sleepConfirm();
	}
	
	//Debug XD
	
	if(e.keyCode == 69) {
		demonmodifier = 7;
	}
}

var Player = {
	matches : {},
	strength: 0,
	speed: 0,
	endurance: 0,
	gymlevel: 1,
	money: 0,
	swipes: 0,
	health: 100,
	maxhealth: 100,
	time: 8,
	meridiem: "AM",
	inventory: {
		"Flowers" : 0,
		"Coffee" : 0,
		"Chocolate" : 0,
		"Ughs" : 0,
		"Diamond Ring" : 0,
		"Sports Car" : 0
	},
	job: {
		level: -1,
		title: "Delivery Guy",
		desc: "Deliver some food",
		pay: 2,
		nextjob: 10
	},
	apocalypse: false,
	partnerid: null,
	demonkills: 0
};

var Shop = {
	"Flowers" : 10,
	"Coffee" : 20,
	"Chocolate" : 40,
	"Ughs" : 50,
	"Diamond Ring" : 100,
	"Sports Car" : 10000
};

var jobs = [
	{
	level: 0,
	title: "Mailroom Guy",
	desc: "Let's talk about the mail",
	pay: 5,
	nextjob: 25
	},
	{
	level: 1,
	title: "Craigslister",
	desc: "email@notascam.ru",
	pay: 8,
	nextjob: 45
	},
	{
	level: 2,
	title: "Code Monkey",
	desc: "INDEXES START AT 0",
	pay: 15,
	nextjob: 70
	},
	{
	level: 3,
	title: "Dancer",
	desc: "15 clubs a day, baby",
	pay: 30,
	nextjob: 100
	},
	{
	level: 4,
	title: "CEO",
	desc: "The logical conclusion",
	pay: 1000,
	nextjob: 0
	}
];

var User = function( name, age, face, hat, clothes, matchable, profile, likes, favoritestat, chat, chathistory, likelevel, msgcount, demon, bounty, health ) {
	this.name = name;
	this.age = age;
	this.face = face;
	this.hat = hat;
	this.clothes = clothes;
	this.matchable = matchable;
	this.profile = profile;
	this.likes = likes;
	this.favoritestat = favoritestat;
	this.chat = chat;
	this.chathistory = chathistory;
	this.likelevel = likelevel;
	this.msgcount = msgcount;
	this.demon = demon;
	this.bounty = bounty;
	this.health = health;
};

var currentUser = {};

var datingbgs = ["vdbg1.png","vdbg2.png","vdbg3.png","vdbg4.png","vdbg5.png"];

var names = ["Mary","Dolores","Danielle","Sadie","Claire","Sasha","Lisa","Dani","Martha","Paige","Lana","Cheryl","Pam","Amanda","Penelope","Justine","Polly","Reina","Steve","Catherine"];
var demonnames = ["Abaddon","Adad","Beelzebub","Azathoth","Lilith","Werzelya","Xolotl","Yachemi","M̷̧̦̠̤̗̜͍̘͚̰̜̻͓͒͐̆͂̂̀͋͌͐̑̋̈́́͗͒̐̓́͗̓̌͒̕̕͝a̸̢̛̪͔͎̜͉̻̪̭̦̜͈̯̠̳̫̝͎̯͓͎̥͚̝̿̄̾͜r̴̡̛̲̻͉̪͖̙̪͖̳̯̩̹̗͉̜̯̗̟̠̺̜̱͉͕̿̒̊̾̊͛̈́̀͑̈́̆̂̏͑̈́̓̌̀̐̕̚͠͝y̷̡̙̰̺͕̠͉̰̤͉̑̀̂̊̚","S̶̡͍̆͆́̚ṭ̶̥̰͉̬̬̻̞͚̝̦͔̩͉͌͂̉͌̇̈́̎̈͗̐̎̒͝ą̴̝̫͉̰͙̻̗̳̜͍͂̀͐̀͜n̵̛͖̥̯̭͉̘̳̟͎̙̈́̽͂̀̏","Ư̸͖̪̄͗̒͌̿͛͗̽̍̈̈̀̒͗͒̅̂̔͊̈́͌́̇͆̅͛͂͛̃̓͛͌͌́͑̈́̎͂͘͘̚̚͠͝͝͠r̸̨̛̹̝͎̙̯̲̖̜͚̜̘̦͖͉̥̩̼̫̲̜̙̖̣̔̆͑̍̌́̋̃̈́̂̀͆͋̀͛͋͒͋̃̽̈́̈́̈́͛̌̾̏͌̾̇̌̋́̐̅̇͘̕̕͝͝͝ͅm̴̢̢̨̡̢̡̢̼̝̯̖̠̻̱̠̰̘̠̞͕̻̝͈̺̮̝̮̘̱̲̒͒̽̈́̇̎̅͋̈̏̓͂̈́͂̒́̾͋̓̊̀̓̀̓̋̂͛͋̒͆͜͜͜͠͠ͅͅu̵̖͉͎̪̥͚̓̀̓͋m̷̧̢̢̢̡̛̮͙̤̞͈͈̝̞̫͕͈͎̪͈̼̾̿͐͆́͛̎̈̈́̅́͆͐̑̈́͐̔̏̔̍͊̀̿̆̓̆̄̈́̿́͊͘͜͝͠"];
var faces = ["face1.png","face2.png","face3.png","face4.png","face5.png","face6.png","face7.png","face8.png","face9.png","face10.png","face11.png","face12.png","face13.png","face14.png","face15.png","face16.png"];
var demonfaces = ["squid1.png","squid2.png","vamp.png","eyeball.png","caharbos.png","lop.png","doug.png"];
var hats = ["none"];
var clothes = ["clothes1.png","clothes2.png","clothes3.png","clothes4.png"];
var demonclothes = [];
var desc = ["Where are all the good guys? P.S. Luvvv my h8rs", "if u can't handle me at my worst u don't deserve me at my best <3", "I'm a small-town girl, living in a lonely world. GO COUGS", "Please no cheesy pickup lines. K thx bye", "😙😙😙😛", "What's the deal with all the black cats I've been seeing"];
var demondesc = ["Definitely not a demon.","What's up y'all, new here... anyone wanna meet up after dark? ;)","Looking for a nice guy/girl. Must be human.", "I'm looking for some TLC from a nice human.", "EATING SOULS SINCE THE DAWN OF TIME. ALSO I MAKE A MEAN MACARONI", "a̵̧̯̮̘̅͑̐͂̀͂̌́̇̾̇̕̚̚͝s̶̾̀͐́̚͜d̸̠̫͌̉̂͑̚a̵̢͖̩͕̭̞̙̹̜̒̒̒̔̐̓̑̊̄̕͝s̶̱̮̥̻̻̩̲̜͇̣̯͈͓̰͖̓͑̂ḑ̴͍̱̈́͗̾̈́̓͠a̴͎̜̲̫͉͚̟̘͈͓̹̍͑̐̉̀̋̂ͅs̶͎̓́͑̓͊̽͊̅͗͂̍̋̄̚d̸̡̲̗̳͚̮̟͍̊̊̎͌̀̓̀̆́̎̓̔̕̚͜ą̴̛͇͚̦̙̥̤͖̟͈̲̏̀̆͌̓̅̏́͒͐̚s̵̪̝̬̲̖̩̟̺̪̪̽͗̆̂̑̕͠ͅḋ̵̡̛͈͇͈̀̉̏́̑̚a̵̧̰̬̿̈́͋̿̃̉͌̕͘͘͝ṣ̵̢̼̎̈́̽̿̓́̀́͠d̴̡̫͓̥͇͍͙̹̅̈́̾̂a̷̩͍̮̫͍̪̟̰̙̳̹̅s̶̳̟̥̬͉͐̈́͊͛̀̎̓̀́̈́̒̑̓̌͝d̵̟͓͈͈̳̮̪̙̣̻͓̠͛̈́͌̉̄͒͆̈́͝ą̴̛̘̯̅̍̌̈̀͊́̀̽̀́͑̀̎s̸̡̤̙͎̹̭̦̲͗̓͆̀̃a̸̛̪̩͖̿͂̓̑̅̍͋̏̚̚͠͝ͅg̸̣̱̙̃a̸̲͓͍̳͎͌̽̊̎͊͌͆s̵͚̭̈́̉͐̓̀͆͛̈͌̀͝ą̸̫̙͈̰̗̗̣̇̅̑͊̋̋́̒͗ͅd̷̹̼̫͓̖͖̖͎͛͜f̷̧̡̠͖͍̲̞̞̻̪̹̻͓̖̘̐͠h̴̛̰̖̩̙̞̝̟͒́̈́̈̈̚"];
var stats = ["strength", "speed", "endurance"];

var demonmodifier = 0,
	msgLikeMod = 0.5,
	dateLikeMod = 10,
	apocHelp = "";
	
var afterApocHelpMsg = "<strong>Fighting</strong><br><br>Ever since the apocalypse there've been a lot more demons<br>around...<br><br>When you match with a demon, you can fight them!<br>Fighting will provide you with more money, to fight<br>more demons! Once the bar fills (based on speed), press<br>'fight' again to deal damage.<br><br>Deal more damage to demons based on strength. Speed helps you fight<br>faster. Endurance increases your overall health.<br><br>The total number of swipes helps you deal damage.<br>Your partner's like level may also help in battle...";

var chatmessages1 = ["I just love ", "I wish someone would buy me ","Hi there!", "Do you like the band Umpire Weekday?","Would you ever eat a bar of soap, if you were like, reaallly hungry??"];
var chatmessages2 = ["I just love ", "I wish someone would buy me ","Hello. How are you","Omg, u r so fny!!!!!!!!!!!!","Got any grapes?","Stop sending me Fortnite memes","hiiiiiii"];
var chatmessages3 = ["I just love ", "I wish someone would buy me ","What's up?","What's your star sign?","👌 o👌 k👌"];
var chatmessages4 = ["I just love ", "I wish someone would buy me ","hiya sugar","Have you heard of a leaden 'dara'?","IAS1Iewwrwe\]09x", "omg butt text 😆"];
var chatlist = [chatmessages1,chatmessages2,chatmessages3,chatmessages4];

var demonpartnermessages = ["THIS IS FOR THE TIME YOU SAID THE DRESS MADE ME LOOK FAT","DIEDIEDIEDIEDIEDIE","so cute rn 👺 ur missin out"];	
var demonchatmessages1 = ["I WILL DESTROY YOU", "I CAN HEAR YOUR FLESH SCREAMING","Torturing sinners, ttyl","My fav director is definitely Guillermo.","Is your name Ash? Because I wanna see your boomstick."];
var demonchatmessages2 = ["If i asked to come over would u invite me in ...? JW","Hey hot stuff, ever been with a demon before?","YOU WILL BE MY ETERNAL SLAVE","Demonic Hello"];
var demonchatmessages3 = ["DIE, INSECT","DO NOT CHALLENGE ME TO A ROCK-OFF","HIYA, GEORGIE","Can't we just put our differences aside? You're going to die regardless","I'm taking you to hell -- to meet my parents!"];
var demonchatmessages4 = ["Melvin can't save you now!!","Hi. Uh. You know I'm a demon, right?","Don't watch past the first Paranormal Activity. That franchise is HELLISH!","Howdy!"];
var demonchatlist = [demonchatmessages1,demonchatmessages2,demonchatmessages3,demonchatmessages4];

function addRandomUser() {
	var demon = Math.floor(Math.random() * demonmodifier);
	if(demon > 4) {
		var randname = demonnames[Math.floor(Math.random() * demonnames.length)]
		var randage = Math.floor(Math.random() * 42) + 180;
		var randface = demonfaces[Math.floor(Math.random() * demonfaces.length)];
		var randhat = hats[Math.floor(Math.random() * hats.length)];
		var randclothes = "none";
		var randmatch = true;
		var randdesc = demondesc[Math.floor(Math.random() * demondesc.length)];
		var randstat = stats[Math.floor(Math.random() * stats.length)];
		var randlike = Object.keys(Shop)[Math.floor(Math.random() * Object.keys(Shop).length)];
		var randchat = demonchatlist[Math.floor(Math.random() * demonchatlist.length)];
		var randbounty = Math.floor(Math.random() * 100);
		var randhealth = randbounty * 100;
		
		currentUser = new User ( randname, randage, randface, randhat, randclothes, randmatch, randdesc, randlike, randstat, randchat, [], 0, 0, true, randbounty, randhealth );
	} else {
		var randname = names[Math.floor(Math.random() * names.length)];
		var randage = Math.floor(Math.random() * 42) + 18;
		var randface = faces[Math.floor(Math.random() * faces.length)];
		var randhat = hats[Math.floor(Math.random() * hats.length)];
		var randclothes = clothes[Math.floor(Math.random() * clothes.length)];
		var tmprand = Math.floor(Math.random() * 10);
		if( tmprand > 2 ) {
			var randmatch = false;
		} else {
			var randmatch = true;
		}
		var randdesc = desc[Math.floor(Math.random() * desc.length)];
		var randstat = stats[Math.floor(Math.random() * stats.length)];
		var randlike = Object.keys(Shop)[Math.floor(Math.random() * Object.keys(Shop).length)];
		var randchat = chatlist[Math.floor(Math.random() * chatlist.length)];
	
		currentUser = new User ( randname, randage, randface, randhat, randclothes, randmatch, randdesc, randlike, randstat, randchat, [], 0, 0, false, 0, 0 );
	}
}

var appButtons = [
	"<div class='appB'><img draggable='false' onclick='opendate();' src='vd.png' style='left: 50px; top: 50px;'><p style='left: 76px; top: 130px;'>Dating</p></div>",
	"<div class='appB'><img draggable='false' onclick='opengym();' src='gym.png' style='left: 150px; top: 50px;'><p style='left: 182px; top: 130px;'>Gym</p></div>",
	"<div class='appB'><img draggable='false' onclick='openshop();' src='store.png' style='left: 250px; top: 50px;'><p style='left: 282px; top: 130px;'>Shop</p></div>",
	"<div class='appB'><img draggable='false' onclick='openstats();' src='stats.png' style='left: 350px; top: 50px;'><p style='left: 380px; top: 130px;'>Stats</p></div>",
	"<div class='appB'><img draggable='false' onclick='openwork();' src='work.png' style='left: 50px; top: 170px;'><p style='left: 80px; top: 250px;'>Work</p></div>",
	"<div class='appB'><img draggable='false' onclick='openhelp();' src='help.png' style='left: 150px; top: 170px;'><p style='left: 182px; top: 250px;'>Help</p></div>"
];

function addSleepButton() {
	var sb = document.createElement('img');
	sb.id = "sleepButton";
	sb.onclick = function(){sleep();};
	sb.src = 'power.png';
	
	display.appendChild(sb);
}

function addBackButton(div) {
	var bb = document.createElement('button');
	bb.id = "backButton";
	bb.onclick = function(){ if(fighting==false) { drawPhone();} };
	bb.innerHTML = "Back";
	
	div.appendChild(bb);
}

function addGiftButton(x) {
	var gb = document.createElement('button');
	gb.id = "giftButton";
	gb.onclick = function(){opengifts(x);};
	gb.innerHTML = "Give Gift";
	
	display.appendChild(gb);
}

function addMsgBackButton(x) {
	var bb = document.createElement('button');
	bb.id = "backButton";
	if(x == 'outer') {
		bb.onclick = function(){ opendate();};
	} else if(x == 'inner') {
		bb.onclick = function(){ if(id != 0) { stopfight(); } openmessages(); };
	}
	bb.innerHTML = "Back";
	
	display.appendChild(bb);
}

function addMsgButton(x) {
	var mb = document.createElement('button');
	mb.id = "msgButton";
	mb.onclick = function(){
		if(fighting == false) {
			if(Player.matches[x].msgcount < 6 || Player.matches[x].demon) {
				Player.matches[x].msgcount++;
				Player.matches[x].likelevel += msgLikeMod;
				var randmsg = Player.matches[x].chat[Math.floor(Math.random() * Player.matches[x].chat.length)];
				if(randmsg == "I just love ") {
					randmsg += Player.matches[x].favoritestat + "!";
				} else if(randmsg == "I wish someone would buy me ") {
					randmsg += Player.matches[x].likes + "...";
				}
			
				Player.matches[x].chathistory.push(randmsg);
				addMsg(randmsg);
				messages(x);
			} else {
				Player.matches[x].chathistory.push("We've talked enough for now.");
				addMsg("We've talked enough for now.");
			}
		}
	};
	mb.innerHTML = "Message";
	
	display.appendChild(mb);
}

function addDateButton(u) {
	var gb = document.createElement('button');
	gb.id = "dateButton";
	
	var dateUser = Player.matches[u];
	
	//Let's assign our user's stat to a variable so we can keep easier track of it.
	//Later on, I'd like to scale the necessary level of the user's favorite stat
	//to some number (potentially the user's bounty, which could also influence the
	//effect the user has on demon fights).
	var dateSkillReq = dateUser.favoritestat;
	
	gb.onclick = function(){ 
		if((Player.time < 9 && Player.meridiem == "PM") || Player.meridiem == "AM") {
			if(Player[dateSkillReq] > 10) {
				dateUser.likelevel += dateLikeMod; 
				Player.time += 3; 
				resetMsgCount(); 
				dateFade(); 
				messages(u); 
			} else {
				popup("Need to raise " + dateSkillReq + " to 10.");
			}
		} else {
			toolate();
		}
	};
	gb.innerHTML = "Go On Date";
	
	display.appendChild(gb);
}

function addPartnerButton(u) {
	var pb = document.createElement('button');
	pb.id = "partnerButton";
	pb.onclick = function(){ Player.partnerid = u; addMsg("YES! I'm so happy you asked!"); document.getElementById('partnerButton').remove(); if(!Player.apocalypse) { popup(Player.matches[u].name + " became your partner!"); setTimeout(apocalypse,3000); } };
	pb.innerHTML = "Ask to Be Partner";
	
	display.appendChild(pb);
}

function addFightButton(u) {
	var fb = document.createElement('button');
	fb.id = "fightButton";
	fb.onclick = function(){ if(fighting == false) { initfight(u); } };
	fb.innerHTML = "Fight";
	
	display.appendChild(fb);
}

var fighting = false
	id = 0;

function initfight(u) {
	if(!fighting) {
		fighting = true;
		
		//Clear Messages
		Player.matches[u].chathistory = [];
		messages(u);
		
		document.getElementById('enemyHealth').remove();
		var ehealthDisplay = document.createElement('p');
		ehealthDisplay.id = "ehealthDisplay";
		ehealthDisplay.innerHTML = "Health: " + Player.matches[u].health;
		
		display.appendChild(ehealthDisplay);
	
		var healthdisplay = document.createElement('p');
		healthdisplay.id = "healthDisplay";
		healthdisplay.innerHTML = "Your Health: " + Player.health.toString();
	
		display.appendChild(healthdisplay);
	
		var enemyTimer = document.createElement("PROGRESS");
		enemyTimer.id = "enemyTimer";
		enemyTimer.value = 0;
		enemyTimer.max = 1000;
	
		var playerTimer = document.createElement("PROGRESS");
		playerTimer.id = "playerTimer";
		playerTimer.value = 0;
		playerTimer.max = 500;
	
		display.appendChild(enemyTimer);
		display.appendChild(playerTimer);
	}
	
	id = setInterval(function(){fight(u);},1000);
}

function stopfight() {
	clearInterval(id);
	id = 0;
	fighting = false;
	
	document.getElementById("enemyTimer").remove();
	document.getElementById("playerTimer").remove();
	document.getElementById("ehealthDisplay").remove();
	document.getElementById("healthDisplay").remove();
	if(document.getElementById("statPopup")) { document.getElementById("statPopup").remove(); };
}

function fight(u) {

	var fightUser = Player.matches[u];
	
	if(fightUser.health <= 0) {
		stopfight();
		
		Player.demonkills += 1;
		Player.money += fightUser.bounty;
		popup("You defeated a demon and earned $" + fightUser.bounty.toString());
		
		var empty = document.createElement('div');
		display.appendChild(empty);
		addMsg("NOOOOOOOOOOO");
		
		setTimeout(function() { delete Player.matches[u]; openmessages(); }, 1500);
	}
	
	if(Player.health <= 0) {
		stopfight();
		
		//Player loses half their money (MUAHAHAH)
		popup("You were defeated! Lost $" + (Math.floor(Player.money/2)).toString());
		Player.money = Math.floor(Player.money/2);
				
		//Reset Enemy's Health (Partner shouldn't have more than 1000000 health)
		fightUser.health = fightUser.bounty * 100;
		if(fightUser.health > 1000000) fightUser.health = 1000000;
		
		var empty = document.createElement('div');
		display.appendChild(empty);
		addMsg("HAHAHA YOU WILL NEVER DEFEAT ME");
		
		setTimeout(function() { resetMsgCount(); Player.time = 8; Player.meridiem = "AM"; Player.health = Player.maxhealth; drawPhone(); },1500);
	}
	
	if(Player.partnerid) {
		var partnerUserDmg = Player.matches[Player.partnerid].likelevel;
	} else if(!Player.partnerid) {
		var partnerUserDmg = 0;
	}
	
	document.getElementById('enemyTimer').value += fightUser.bounty / 2;
	document.getElementById('playerTimer').value += Player.speed;
	
	if(document.getElementById('enemyTimer').value >= document.getElementById('enemyTimer').max) {
		Player.health -= Math.floor(fightUser.bounty / 10);
		popup("Enemy deals " + (Math.floor(fightUser.bounty / 10)).toString() + " damage");
		document.getElementById('enemyTimer').value = 0;
		document.getElementById('healthDisplay').innerHTML = "Your Health: " + Player.health.toString();
	}
	
	if(document.getElementById('playerTimer').value >= document.getElementById('playerTimer').max) {
		popup("Click fight!");
		document.getElementById('fightButton').onclick = function() {
			fightUser.health -= Player.strength + partnerUserDmg + Player.swipes;
			popup("You deal " + (Player.strength + partnerUserDmg + Player.swipes).toString() + " damage");
			playerTimer.value = 0;
			document.getElementById('ehealthDisplay').innerHTML = "Health: " + fightUser.health.toString();
		}
	}
}

function splashScreen() {
	
	timeStatusBar.style.display = "none";

	var authorText = document.createElement('h1');
	var ludumText = document.createElement('h1');
	authorText.innerHTML = "<br>Shut-In Games<br>present:";
	ludumText.innerHTML = "<br><br><br>For Ludum Dare 41";
	authorText.className = 'splash';
	ludumText.className = 'splash';
	
	var logo = document.createElement('img');
	logo.src = "logo.png";
	logo.draggable = false;
	logo.style.position = "absolute";
	logo.style.left = "13px";
	
	setTimeout(function(){screen.appendChild(authorText);},1300);
	setTimeout(function(){screen.appendChild(logo); },1900);
	setTimeout(function(){screen.appendChild(ludumText);},2500);
	setTimeout(function(){ludumText.remove(); authorText.remove(); logo.remove(); drawPhone();},7000);
}

function dateFade() {
	var fade = document.createElement('div');
	fade.id = 'applicationFade';
	
	display.appendChild(fade);
	
	drawTimeBar();
	resetMsgCount();
}

function apocalypse() {
	display.style.display = "none";
	timeStatusBar.style.display = "none";
	
	var anim = document.createElement('canvas');
	var ctx = anim.getContext('2d');
	anim.id = 'animScreen';
	anim.width = 500;
	anim.height = 720;
	
	screen.appendChild(anim);
	
	var pixels = [];
	
	for( var i = 0; i < 501; i+=50 ) {
		for( var j = 0; j < 721; j+=50 ) {
			pixels.push([i,j]);
		}
	}
	
	for( var k = 0; k < pixels.length; k++ ) {
		var x = pixels[k][0];
		var y = pixels[k][1];
		drawScreenRects(ctx,x,y,'rgba(255,255,255,',k);
	}
	
	ctx.fillStyle = '#ffffff';
	ctx.font = '60px Arial';
	ctx.fillText("APOCALYPSE",50,350);
	
	//Let's change the game to reflect the apocalypse!!
	demonmodifier = 7;
	
	//Uh oh... our new girlfriend just became a demon... Totes Awk!
	var apocPartner = Player.matches[Player.partnerid];
	apocPartner.name = "Demonic " + Player.matches[Player.partnerid].name;
	apocPartner.demon = true;
	apocPartner.bounty = 1000000;
	apocPartner.health = 100000;
	apocPartner.chat = demonpartnermessages;
	apocPartner.chathistory = [];
	apocPartner.chathistory.push("Sorry to break it to you over text, but I'm a DEMON now. lol");
	
	Player.apocalypse = true;
	Player.partnerid = null;
	
	apocHelp = afterApocHelpMsg;
	
	document.getElementById('animScreen').onclick = function(){document.getElementById('animScreen').remove(); sleep();};
}

function drawScreenRects(ctx,x,y,color,op) {
	ctx.fillStyle = color + (100 - op).toString() + ")'";
	ctx.beginPath();
	ctx.fillRect(x,y,50,50);
	ctx.closePath();
}

function drawPhone() {
	if(display.style.display == "none") {
		display.style.display = "";
	}
	
	display.innerHTML = "";
	
	drawTimeBar();
	
	if(!document.getElementById('bgImg')) {
		var bgrndImg = document.createElement('img');
		bgrndImg.id = "bgImg";
		bgrndImg.style.draggable = false;
		bgrndImg.src = 'phonebg.png';
		display.appendChild(bgrndImg);
	}
		
	for( var i = 0; i < appButtons.length; i++ ){
		display.innerHTML += appButtons[i];
	}
	
	addSleepButton();
}

function drawTimeBar(){
	if(timeStatusBar.style.display = "none") {
		timeStatusBar.style.display = "";
	}
	
	//Meridiem Control (Changes Phone Time Status based on time of day.)
	if(Player.time > 12) {
		Player.time = 1;
		if(Player.meridiem == "AM") {
			Player.meridiem = "PM";
		} else if(Player.meridiem == "PM"){
			Player.meridiem = "AM";
		}
	}
	
	timeStatus.innerHTML = "<img draggable='false' src='bars.png'>  <p>" + Player.time.toString() + " " + Player.meridiem + "</p> <img draggable='false' src='btry.png'>";
}

var dating = false;

function opendate() {
	display.innerHTML = '';
	addRandomUser();
	
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	var messages = document.createElement('div');
	messages.id = 'messageBtn';
	messages.innerHTML = "<img draggable='false' src='messages.png' onclick='openmessages();' style='top: -18px; position:absolute;'>";
	
	var dateDiv = document.createElement('canvas');
	dateDiv.width = 450;
	dateDiv.height = 450;
	dateDiv.id = 'dateDiv';
	var ctx = dateDiv.getContext('2d');
	
	dating = true;
		
	var datingbg = new Image;
	datingbg.onload = function() {
		ctx.drawImage(datingbg,0,0);

		var userFace = new Image,
			userHat = new Image,
			userClothes = new Image;
		userFace.onload = function() {
			ctx.drawImage(userFace,100,100);
			if(currentUser.clothes != "none") {
				userClothes.onload = function() {
					ctx.drawImage(userClothes,25,0);
				}
				userClothes.src = currentUser.clothes;
			}
		}
		userFace.src = currentUser.face;
		if(currentUser.hat != "none") {
			userHat.onload = function() {
				ctx.drawImage(userHat,100,80);
			}
			userHat.src = currentUser.hat;
		}

		var mousedownx = 0,
			mouseupx = 0;
		
		document.getElementById('dateDiv').onmousedown = function(e) {
			mousedownx = e.clientX;
		}
		document.getElementById('dateDiv').onmouseup = function(e) {
			mouseupx = e.clientX;
			if(dating) {
				if(mousedownx > mouseupx && (mousedownx - 100) > mouseupx) {
					//"Disliked"
					Player.swipes++;
					opendate();
				} else if(mousedownx < mouseupx && (mouseupx - 100) > mousedownx) {
					//"Liked"
					if(currentUser.matchable) {
						var id = Object.keys(Player.matches).length;
						setTimeout( function() {popup("You matched with " + Player.matches[id].name + "!");},1000);
						Player.matches[id] = currentUser;
						
					}
					Player.swipes++;
					opendate();
				}
			}
		}
	}
	
	var randdatingbg = datingbgs[Math.floor(Math.random() * datingbgs.length)];
	datingbg.src = randdatingbg;
	
	var userData = document.createElement('div');
	userData.id = 'userData';
	userData.innerHTML = "<strong>" + currentUser.name + ",<strong> ";
	userData.innerHTML += currentUser.age.toString() + "<br><br>" + currentUser.profile;
	
	appDiv.appendChild(messages);
	appDiv.appendChild(dateDiv);
	appDiv.appendChild(userData);
	display.appendChild(appDiv);
	addBackButton(display);
}

function openmessages(){
	dating = false;
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	appDiv.innerHTML += "<h1 style='text-align:center; top: 50px;'>Messages</h1>";
	
	for( var i = 0; i < Object.keys(Player.matches).length; i++ ){
		var matchedUser = Player.matches[Object.keys(Player.matches)[i]];
		if(matchedUser.demon) {
			appDiv.innerHTML += "<br><button class='messageMatch' onclick='messages(&quot;" + Object.keys(Player.matches)[i] + "&quot;);'><img src='" + matchedUser.face + "' style='width:60px; height:60px;'><br>" + matchedUser.name + " (Health: " + matchedUser.health.toString() + ")</button>";
		} else {
			appDiv.innerHTML += "<br><button class='messageMatch' onclick='messages(&quot;" + Object.keys(Player.matches)[i] + "&quot;);'><img src='" + matchedUser.face + "' style='width:60px; height:60px;'><br>" + matchedUser.name + " (Like Level: " + matchedUser.likelevel.toString() + ")</button>";
		}
	}
	
	display.appendChild(appDiv);
	addMsgBackButton('outer');
}

function messages(u) {
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	var msgUser = Player.matches[u];
	
	var userName = document.createElement('h1');
	userName.style.lineHeight = 0.5;
	userName.style.textAlign = "center";
	userName.innerHTML = msgUser.name;
	appDiv.appendChild(userName);
	
	if(msgUser.demon) {
		var userHealth = document.createElement('p');
		userHealth.id = 'enemyHealth';
		userHealth.style.lineHeight = 0.5;
		userHealth.style.textAlign = "center";
		userHealth.innerHTML = "Health: " + msgUser.health.toString();
		appDiv.appendChild(userHealth);
	} else {
		var userLikeLevel = document.createElement('p');
		userLikeLevel.style.lineHeight = 0.5;
		userLikeLevel.style.textAlign = "center";
		userLikeLevel.innerHTML = "Like Level: " + msgUser.likelevel.toString();
		appDiv.appendChild(userLikeLevel);
	}
		
	if(msgUser.chathistory.length > 0) {
		for( var i = 0; i < msgUser.chathistory.length; i++ ) {
			var msg = document.createElement('div');
			msg.className = "messageBox";
			msg.innerHTML = msgUser.chathistory[i];
			appDiv.appendChild(msg);
		}
	}
	display.appendChild(appDiv);
	
	
	if(msgUser.demon) {
		addFightButton(u);
	} else {
		addGiftButton(u);
		if (msgUser.likelevel > 10) {
			addDateButton(u);
		} if (msgUser.likelevel > 100 && u != Player.partnerid) {
			addPartnerButton(u);
		}
	}
	
	addMsgButton(u);
	addMsgBackButton('inner');
}

function addMsg(txt) {
	var msg = document.createElement('div');
	msg.className = "messageBox";
	msg.innerHTML = txt;
	document.getElementById('application').appendChild(msg);
	document.getElementById('application').scrollTop = document.getElementById('application').scrollHeight;
}

function opengifts(u) {
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	for( var i = 0; i < Object.keys(Player.inventory).length; i++ ) {
		var gift = Object.keys(Player.inventory)[i];
		appDiv.innerHTML += "<br><button onclick='if(Player.inventory[&quot;" + gift + "&quot;] > 0) { givegift(" + u + ",&quot;" + gift + "&quot;); }'>" + gift + " (" + Player.inventory[gift].toString() + " in inventory)</button>";
	}
	
	display.appendChild(appDiv);
	addMsgBackButton('inner');
}

function givegift( u, g ) {
	var giftuser = Player.matches[u];
	var giftLikeMod = 0;
	
	console.log(giftuser, g);
	
	if(g == giftuser.likes) {
		giftLikeMod = (Shop[g] / 2);
		
	} else { 
		giftLikeMod = (Shop[g] / 10);
	}
	giftuser.likelevel += giftLikeMod;
	Player.inventory[g]--;
	
	opengifts(u);
	
	popup("Gave " + giftuser.name + " a " + g + " (+" + giftLikeMod.toString() + ")");
}

function opengym() {
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	appDiv.innerHTML += "<button class='gymBtn' onclick='if((Player.time < 11 && Player.meridiem == &quot;PM&quot;) || Player.meridiem == &quot;AM&quot;) { train(&quot;strength&quot;); } else { setTimeout(toolate,100); }'>Crush Some Reps</button>";
	appDiv.innerHTML += "<button class='gymBtn' onclick='if((Player.time < 11 && Player.meridiem == &quot;PM&quot;) || Player.meridiem == &quot;AM&quot;) { train(&quot;speed&quot;); } else { setTimeout(toolate,100); }'>Blast Some Sprints</button>";
	appDiv.innerHTML += "<button class='gymBtn' onclick='if((Player.time < 11 && Player.meridiem == &quot;PM&quot;) || Player.meridiem == &quot;AM&quot;) { train(&quot;endurance&quot;); } else { setTimeout(toolate,100); }'>Pound The 'Mill</button>";
	appDiv.innerHTML += "<button class='gymBtn' onclick='if(Player.money >= (Math.pow(Player.gymlevel,2) * 5)) { Player.money -= (Math.pow(Player.gymlevel,2) * 5); Player.gymlevel += 1; opengym(); }'>Upgrade Gym Membership ($" + (Math.pow(Player.gymlevel,2) * 5).toString() + ")</button>";
	
	display.appendChild(appDiv);
	addBackButton(display);
}

function toolate() {
	popup("It's late! Press 's' to sleep.");
}

function train(stat) {
	Player[stat] += Player.gymlevel;
	if(stat=="endurance"){
		Player.maxhealth = 100 + (25 * Player.endurance);
		Player.health += (25 * Player.endurance);
	}
	popup(stat.replace(/\b\w/g, l => l.toUpperCase()) + " increased by " + Player.gymlevel.toString() + ".");
	Player.time++;
	drawTimeBar();
	resetMsgCount();
}

function popup(txt) {
	if(!document.getElementById('statPopup')) {
		var statPopup = document.createElement('div');
		statPopup.id = "statPopup";
		statPopup.innerHTML = txt;
		display.appendChild(statPopup);
	} else {
		document.getElementById('statPopup').remove();
		var statPopup = document.createElement('div');
		statPopup.id = "statPopup";
		statPopup.innerHTML = txt;
		display.appendChild(statPopup);
	}
	setTimeout(function(){document.getElementById('statPopup').remove();},2000);
}

function openshop() {
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	//Draw the nice money display.
	appDiv.innerHTML = '<div id="shopDisplay"><p>$ ' + Player.money.toString();
	appDiv.innerHTML += "<br>Welcome to the shop.</p></div>";
	
	for( var i = 0; i < Object.keys(Shop).length; i++ ) {
		appDiv.innerHTML += "<br><div class='shopItem'>" + Object.keys(Shop)[i] + "<button onclick='buyItem(&quot;" + Object.keys(Shop)[i] + "&quot;)'>Buy for $" + Shop[Object.keys(Shop)[i]].toString() + "</button></div>";
	}
	
	display.appendChild(appDiv);
	addBackButton(display);
}

function buyItem(item) {
	var price = Shop[item];
	
	if(Player.money >= price) {
		Player.money -= price;
		Player.inventory[item]++;
		openshop();
	}
}

function openstats() {
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	appDiv.innerHTML = '<strong>Player Stats:</strong>';
	appDiv.innerHTML += '<br><br>' + 'Money: ' + Player.money + '<br>Total Swipes: ' + Player.swipes.toString();
	appDiv.innerHTML += '<br>Job: ' + Player.job.title;
	appDiv.innerHTML += '<br>Max Health: ' + Player.maxhealth.toString() + "<br>Gym Level: " + Player.gymlevel.toString();
	appDiv.innerHTML += '<br>Strength: ' + Player.strength.toString() + '<br>Speed: ' + Player.speed.toString();
	appDiv.innerHTML += '<br>Endurance: ' + Player.endurance.toString();
	if(Player.partnerid != null) {
		appDiv.innerHTML += "<br>Partner: " + Player.matches[Player.partnerid].name;
	} if(Player.apocalypse) {
		appDiv.innerHTML += "<br>Demons Defeated: " + Player.demonkills.toString();
	}
	
	display.appendChild(appDiv);
	addBackButton(display);
}

function openwork() {
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	appDiv.innerHTML += "<button class='gymBtn' onclick='if((Player.time < 12 && Player.meridiem == &quot;PM&quot;) || Player.meridiem == &quot;AM&quot;) { work(); }'><strong>" + Player.job.title + "</strong> " + Player.job.desc + "</button>";
	if(Player.job.level < 4) {
		appDiv.innerHTML += "<button class='gymBtn' onclick='if(Player.strength >= Player.job.nextjob && Player.speed >= Player.job.nextjob && Player.endurance >= Player.job.nextjob) { nextjob(); } else { popup(&quot;Need to raise all stats to " + Player.job.nextjob.toString() + "!&quot;); }'>Find A New Job</button>";
	}
	display.appendChild(appDiv);
	addBackButton(display);
}

function work() {
	Player.money += Player.job.pay;
	Player.time++;
	popup("Player earned $" + Player.job.pay.toString() + ".");
	drawTimeBar();
	resetMsgCount();
}

function nextjob() {
	var jobindex = Player.job.level + 1;
	
	Player.job = jobs[jobindex];
	popup("Player promoted to " + Player.job.title + "!");
	
	openwork();
}

function sleepConfirm() {
	if(Player.time == 11 && Player.meridiem == "PM") {
		sleep();
	} else if(Player.meridiem == "AM") {
		if(confirm("Are you sure you want to sleep so early?")) {
			sleep();
		}
	} else {
		if(confirm("Are you sure you want to sleep?")) {
			sleep();
		}
	}
}

function sleep() {
	resetMsgCount();
	Player.time = 8;
	Player.meridiem = "AM";
	Player.health = Player.maxhealth;
	drawPhone();
}

function resetMsgCount() {
	for( var i = 0; i < Object.keys(Player.matches).length; i++ ) {
		Player.matches[Object.keys(Player.matches)[i]].msgcount = 0;
	}
}

function openhelp() {
	display.innerHTML = '';
	var appDiv = document.createElement('div');
	appDiv.id = 'application';
	
	appDiv.innerHTML = "<br><strong>Welcome to Demon Date!</strong><br><br>";
	appDiv.innerHTML += "Use the dating app to find a date. If you're having trouble getting <br>";
	appDiv.innerHTML += "someone to go out with you, try increasing your stats at the gym.<br>";
	appDiv.innerHTML += "Use the shop to buy gifts for your would-be partner, but<abr>";
	appDiv.innerHTML += "they can get expensive.<br><br>";
	appDiv.innerHTML += "Press 's' or the power button on the phone's home screen to sleep.<br>";
	appDiv.innerHTML += "Sleeping restores your health, how many messages you can send,<br>";
	appDiv.innerHTML += "and resets the time of day.<br><br>";
	
	appDiv.innerHTML += apocHelp;
	
	display.appendChild(appDiv);
	addBackButton(display);
}

function startGame() {
	drawPhone();
}

setTimeout(splashScreen,500);

//startGame();
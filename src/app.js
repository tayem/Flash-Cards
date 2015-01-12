//Require UI library, kind of necessary.
var UI = require('ui');

//Used to alternate between words and definitions.
var cardState = "word";

//Used to warn when the table is empty before refreshing.
var viewedWarning = false;

//Defining empty variable to use to randomize the word chosen.
var random = "";

//Base table: All words.
var baseLibrary = [
	["Jacobins",				"Extremist group, the Montagnards."],
	["Sans-culottes",			"Mass Mobs who wanted extreme change."],
	["Girondins",				"Moderate Republicans."],
	["Marat",					"Extremist doctor; part of the Jacobins."],
	["Danton",					"Man of the people, one of the leaders of the Jacobins and an extremist as well."],
	["National Convention",		"The group of individuals assigned power over the government of the people."],
	["September Massacres",		"The killing of monarchists, the public and sans-culottes went to the Tuiliries and killed all the opposition."],
	["Tuiliries",				"The palace where Louis was kept after the Flight to Varennes."],
	["Louis XVI",				"The previous monarch ruling France who is executed to show the death of the constitutional monarchy."],
	["Robespierre",				"The most extreme member of the Jacobins, started the Reign of Terror and wanted complete power."]
];

//Table of words the user doesn't know the definition of.
var unknownLibrary = baseLibrary.slice();
	
//Table of words in the current round, used to make sure the same word isnt used multiple times in the same round.
var activeLibrary = baseLibrary.slice();

//Define Card class, this is also the title card.
var card = new UI.Card({
	title: 'Flashcards',
	subtitle: 'The best way to study!',
	body: 'Press select button to go to menu.',
	scrollable: true
});
//Show the title card.
card.show();

//All app logic.

var manageData = function(clickType){
	console.log("Unknown: "+unknownLibrary.length.toString());
	console.log(unknownLibrary);
	console.log("Active: "+activeLibrary.length.toString());
	console.log(activeLibrary);
	
	//Whether it is a long or short click, this prints.
	console.log("You have clicked a button. This proves that you are smart enough to be on congress.");
	if ( clickType === "s" ) {
		console.log("#ShortClick2015");
		
		//If user has longclicked on every word, give them the option to start from scratch.
		if ( unknownLibrary.length === 0 && viewedWarning === false ) {
			console.log("You have stated you know all the words.");
			card.title("Studying Complete!");
			card.subtitle("Studying Complete.");
			card.body("Press select again to restart using all words.");
			viewedWarning = true;
			return;
		}else if( unknownLibrary.length === 0 && viewedWarning === true ){
			unknownLibrary = baseLibrary.slice();
			activeLibrary = unknownLibrary.slice();
			viewedWarning = false;
			return;
		}	
		
		//At the end of the round, alert the user, then start again with words they haven't longclicked on.
		if ( activeLibrary.length === 0 && viewedWarning === false ) {
			console.log("No words remaining.");
			card.title("Round Complete!");
			card.subtitle("No Words Remaining.");
			card.body("Press select again to restart using the words you marked as needing to study more.");
			viewedWarning = true;
			return;
		}else if( activeLibrary.length === 0 && viewedWarning === true ){
			activeLibrary = unknownLibrary.slice();
			viewedWarning = false;
			return;
		}
		
		console.log("If statement to check for remaining words done.");
		//If the user was just on the word, cardState is set to word, show the definition.
		if (cardState === "word") {
			console.log("Word Branch: Initialized.");
			//Pick the next word (we're on definition).
			random = Math.floor(Math.random() * (activeLibrary.length - 1)) + 1;	
			console.log("Word Branch: Next Card Chosen.");
			console.log("The next card's index will be: "+random);
			card.title(activeLibrary[random][0]);
			card.subtitle('What/Who is this?');
			card.body('Press select to go to the definition!');
			console.log("Word Branch: Card Updated.");
			console.log("Word Branch: Card Shown.");
			cardState = "definition";
			console.log("Word Branch: Card State Changed To Definition.");
		}
		//If the user was just on the definiton, cardState is set to definiton (not word), show the next word.
		else{
			console.log("Definition Branch: Initialized.");
			card.title(activeLibrary[random][0]);
			card.subtitle(activeLibrary[random][1]);
			card.body('Press select to go to the next word!');
			console.log("Definition Branch: Card Updated.");
			//Remove word from the active list.
			if (activeLibrary.length === 1) {
				activeLibrary = [];
			}else{
				activeLibrary.splice(random, 1);
			}
			console.log("Definition Branch: Remaining Words Spliced.");	
			console.log("Definition Branch: Card Shown.");
			cardState = "word";
			console.log("Definition Branch: Card State Changed To Word.");
		}
	}else if ( clickType === "l" ){
		console.log("YOU'RE SUCH A POTATO!");
		console.log("#LongClick2015");
		console.log("And on top of clicking a button, you held it too! You could be a presidential candidate!");
		if (cardState === "word") {
			console.log("This word has been removed from the library, as you have stated you know it.");
			card.subtitle("You know this word!");
			if ( unknownLibrary.length === 1 ) {
				unknownLibrary = [];
			}else{
				unknownLibrary.splice(random, 1);
			}
		}
		else{
			console.log("You aren't even on a word!");
		}
	}else{
		console.log("You dun goofed son, you should not see this message.");
	}
	console.log("-------------------------");
	console.log("-Click Handling Complete-");
	console.log("-------------------------");
};

//When shortclick, do app logic with the "s" parameter to reflect this.
card.on('click', 'select', function(e) {
	manageData("s");
});

//When longclick, do app logic with the "l" parameter to reflect this.
card.on('longClick', 'select', function(e) {
	manageData("l");
});

//Log this when everything is defined.
console.log("Magical click functions of destiny have been defined.");


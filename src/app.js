var UI = require('ui');
var cardState = "word";
var done = false;
var random = "blahblahblah";
var words = ["Jacobins",
			"Sans-culottes",
			"Girondins",
			"Marat",
			"Danton",
			"National Convention",
			"September Massacres",
			"Tuiliries",
			"Louis XVI",
			"Robespierre"];
var definitions = ["Extremist group, the Montagnards.",
			"Mass Mobs who wanted extreme change.",
			"Moderate Republicans.",
			"Extremist doctor; part of the Jacobins.",
			"Man of the people, one of the leaders of the Jacobins and an extremist as well.",
			"The group of individuals assigned power over the government of the people.",
			"The killing of monarchists, the public and sans-culottes went to the Tuiliries and killed all the opposition.",
			"The palace where Louis was kept after the Flight to Varennes.",
			"The previous monarch ruling France who is executed to show the death of the constitutional monarchy.",
			"The most extreme member of the Jacobins, started the Reign of Terror and wanted complete power."];
var notShownWords = words;
var notShownDefinitions = definitions;

UI.Card.prototype.updateTitle = function(newTitle){
	this.title = newTitle;
	return null;
};

var card = new UI.Card({
	title: 'Flashcards',
	subtitle: 'The best way to study!',
	body: 'Press select button to go to menu.',
	scrollable: true
});
card.show();

var manageData = function(){
	console.log("You have clicked a button. This proves that you are smart enough to be on congress.");
	if ( notShownWords.length === 0 ) {
			console.log("No words remaining.");
			done = true;
			return;
	}
	console.log("If statement to check for remaining words done.");
	if (cardState === "word") {
		console.log("Word Branch: Initialized.");
		random = Math.floor(Math.random() * (notShownWords.length - 1)) + 1;	
		console.log("Word Branch: Next Card Chosen.");
		card.title(notShownWords[random]);
		card.subtitle('What/Who is this?');
		card.body('Press select to go to the definition!');
		console.log("Word Branch: Card Updated.");
		console.log("Word Branch: Card Shown.");
		console.log("Test - Title of current card = '"+card.title+"'.");
		cardState = "definition";
		console.log("Word Branch: Card State Changed To Definition.");
	}
	else{
		console.log("Definition Branch: Initialized.");
		card.title(notShownWords[random]);
		card.subtitle(notShownDefinitions[random]);
		card.body('Press select to go to the next word!');
		console.log("Definition Branch: Card Updated.");
		notShownDefinitions.splice(random, 1);
		notShownWords.splice(random, 1);
		console.log("Definition Branch: Remaining Words Spliced.");	
		console.log("Definition Branch: Card Shown.");
		console.log("Test - Title of current card = '"+card.title+"'.");
		cardState = "word";
		console.log("Definition Branch: Card State Changed To Word.");
	}
};

card.on('click', 'select', function(e) {
	manageData();
});

console.log("Magical click function of destiny has been defined.");

var UI = require('ui');
var Vector2 = require('vector2');
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
var shownWords = words;
var shownDefinitions = definitions;
var main = new UI.Card({
  title: 'Flashcards',
  icon: 'images/menu_icon.png',
  subtitle: 'The best way to study!',
  body: 'Press select button to go to menu.'
});

main.show();

main.on('click', 'up', function(e) {

});

main.on('click', 'select', function(e) {
	var random =  Math.floor(Math.random() * (shownWords.length - 1)) + 1;	
	var card = new UI.Card({
		title: shownWords[random],
		subtitle: 'What/Who is this?',
		body: 'Press select to go to the definition!',
		scrollable: true
	});
	card.show();
	
	card.on('click', 'select', function(e){
		var defCard = new UI.Card({
			title: shownWords[random],
			subtitle: shownDefinitions[random],
			body: 'Press select to go to the next word!',
			scrollable: true
		});
		shownDefinitions.splice(random, 1);
		shownWords.splice(random, 1);
		defCard.show();	
	})
});
	
main.on('click', 'down', function(e) {

});

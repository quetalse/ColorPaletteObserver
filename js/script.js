document.addEventListener('DOMContentLoaded', function(){

	let publisher = {

		subscribers: {
			event: [] // тип события: подписчик
		},

		on: function (type, fn, context) {
			type = type || 'event';
		
			fn = typeof fn === 'function' ? fn : context[fn];

			if (typeof this.subscribers[type] === "undefined") {
				this.subscribers[type] = [];
			}

			this.subscribers[type].push({
				fn: fn,
				context: context || this
			});
		},

		remove: function (type, fn, context) {
			this.visitSubscribers('unsubscribe', type, fn, context);
		},

		fire: function (type, publication) {
			this.visitSubscribers('publish', type, publication);
		},

		visitSubscribers: function (action, type, arg, context) {
			let pubtype = type || 'event',
				typeSubscribers = this.subscribers[pubtype],
				i,
				max = typeSubscribers ? typeSubscribers.length : 0;
			
			for (i = 0; i < max; i += 1) {
				if (action === 'publish') {
					typeSubscribers[i].fn.call(typeSubscribers[i].context, arg);
				} else {
					if (typeSubscribers[i].fn === arg &&
						typeSubscribers[i].context === context) {
						typeSubscribers.splice(i, 1);
					}
				}
			}
		}
	};

	function makePublisher(o) {
		var i;
		for (i in publisher) {
			if (publisher.hasOwnProperty(i) && typeof publisher[i]==='function'){
				o[i] = publisher[i];
			}
		}

		o.subscribers = {
			event: []
		};
	}


	let colorPicker = {
		
		inputEl: document.getElementsByClassName('color-picker__input')[0],
		titleEl: document.getElementsByClassName('color-picker__title')[0],
		title: '',

		onColorInput: function (e){
			console.log('====')
		},

		onColorChange: function(e){
			colorPicker.titleEl.innerText = e.target.value;
			colorPicker.tile = e.target.value;
			colorPicker.fire('colorchange', this)
		}
	}

	let colorHarmonyItem = function(id){

		this.id = id
		this.color = '#b9b2b2';
		this.elem = document.createElement('')

		this.createElement = 
	}


	// let scoreboard = {

	// 	// элемент HTML, который должен обновляться
	// 	element: document.getElementById('results'),
		
	// 	// обновляет счет на экране
	// 	update: function (score) {
	// 		let i, 
	// 			msg = '';

	// 		for (i in score) {
	// 			if (score.hasOwnProperty(i)) {
	// 				msg += '<p><strong>' + i + '<\/strong>: ';
	// 	 			msg += score[i];
	// 	 			msg += '<\/p>';
	// 	 		}
	// 	 	}

	// 	 	this.element.innerHTML = msg;
	//  	}
	// };

	let colorPalette = {

		keys: {},

		addPlayer: function (player){

			console.log(player.key.toString().charCodeAt())

			let key = player.key.toString().charCodeAt();


			this.keys[key] = player;
		},

		handleKeyPress: function(e){

			if(game.keys[e.which]){
				game.keys[e.which].play();
			}
		},

		handlePlay: function(player){

			let i,
				players = this.keys,
				score = {};

			for(i in players){
				if(players.hasOwnProperty(i)){
					score[players[i].name] = players[i].points;
				}
			}

			this.fire('scorechange', score);

		}

	}

	function Player(){

		this.points = 0;
		this.name = name;
		this.key = key;

		this.fire('newplayer', this);
	}

	Player.prototype.play = function(){
		this.paints += 1;
		this.fire('play', this)
	}


	colorPicker.inputEl.addEventListener('input', colorPicker.onColorInput);
	colorPicker.inputEl.addEventListener('change', colorPicker.onColorChange);

	
/*
	makePublisher(Player.prototype);
	makePublisher(game);
// 

	Player.prototype.on('newplayer', 'addPlayer', game);
	Player.prototype.on('play', 'handlePlay', game);

	game.on('scoreboard', scoreboard.update, scoreboard);

	window.onkeypress = game.handleKeypress;


	let playername, key;

	while(1){
		
		playername = prompt("Add player (name)");
		
		if(!playername){
			break
		}
		while(1){
			key = prompt("Key for " + playername + "?")

			if(key){
				break
			}
		}

		new Player(playername, key)
	}

	*/
});
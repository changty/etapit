Ladder = function(options) {
	if(options === undefined || options === null) {
		options = {};
	}
	var self = this;

	// Default setup 
	this.options = {
		url: "",
		element: $('body'),
		parent: null,
		lifes: elamat, 
		data: kysymykset,
		nOptions: vastausVaihtoehtoja,
		pointsPerQuestion: pistettaVastauksesta,
		theme: 'normal',
		callback: function(data) {console.log('success', data)},
		endOfGame: function() { 

			swal( {
				type: 'success', 
				text: "Peli päättyi!", 
				title: "Sait " + self.points + " pistettä!",
				showCancelButton: false,
				confirmButtonText: "Pelaa uudelleen",
			}, function() {
				location.reload();
			});
		},
	}

	// extends default with given options
	$.extend(self.options, options);
	
	//make pointsPerQuestion an integer
	self.options.pointsPerQuestion = parseInt(self.options.pointsPerQuestion);

	// create container for ladder game
	this.options.element.append('<div class="laddergame game-arena" tabindex="0"></div>');
	this.options.parent = $('.game-arena');

	// variables to be changed during gameplay
	this.lifes = this.options.lifes;
	this.points = 0; 
	this.pointsPerQuestion = this.options.pointsPerQuestion;
	this.currentQuestion = 0; 
	this.isClickable = true;
	this.isGameOver = false;
	this.isPlaying = false;
	this.timeStart = Date.now();
	this.timeEnd = 0;
	this.answers = [];
	self.isAudio = self.options.data[0].preQuestion !== undefined ? true : false; 

	this.LEVEL_HEIGHT = 180;

	// set background
	this.setTheme();
	this.prepareLevels();
	this.drawHealth();
	this.drawCharacter();
	this.drawScore();
	this.drawQuestionArea();
	this.drawProgressbar();
	this.setNextQuestion();
	
	this.preQuestionAudio; 
	this.questionAudio; 
	this.optionAudio; 

	this.onOption = false; 
	
	this.usedIndexes = [];

	this.url = this.options.url;
    this.sound = new Howl({
        urls: [self.url + 'aanet/all_audio.ogg', self.url + 'aanet/all_audio.mp3'],
        sprite: {
            correct: [0, 900],
            draw: [2200, 5000],
            jump: [9000, 300],
            wrong: [10000, 400],
            laser: [10500, 700],
            score: [11500, 1100]
        },
        loop: false
    });

    // Add key-listeners
    self.options.parent.attr('tabindex', 0); 
    $(window).bind('keydown', function(e) {
        // ctrl (repeat the voice)
        if(e.keyCode == 17 || e.which == 17) {
             e.preventDefault(); 
             if(self.isAudio) {
                 self.playButton.click();
              }
         }
        // left arrow and a
        else if(e.keyCode == 37 || e.which == 37 || e.keyCode == 65 || e.which == 65 ) {
         	e.preventDefault(); 
         	self.moveCharacterToWithOutJump('left');
         }

        // right arrow and d
        else if(e.keyCode == 39 || e.which == 39 || e.keyCode == 68 || e.which == 68 ) {
         	e.preventDefault();
        	self.moveCharacterToWithOutJump('right');
         }

        // up arrow and w
        else if(e.keyCode == 38 || e.which == 38 || e.keyCode == 87 || e.which == 87 ) {
          	e.preventDefault();
          	if(self.onOption) {
          		self.onOption.click(); 
          		self.character.removeClass('onLadder');
          	}
          }
    });

    $(window).resize(function() {
    	self.resize(); 
    }); 
    self.resize(); 

	// Check if game has been detached every 1000ms
	var detacherId = setInterval(function () {
		if ($(self.options.parent).parents('body').length === 0) {
	    	self.sound.stop();
	    	$(window).off('resize');
			$(window).unbind();

			self.options = null; 
			clearInterval(detacherId);
		}
	}, 1000);

	self.drawLevels(); 
	self.resize();
}

Ladder.prototype.setTheme =  function() {
	var self = this;

	$("[id^=mathdriller-style]").remove();
	if(self.options.theme == "normal") {
		$(self.options.parent).addClass(self.options.theme);
		style = this.options.url + 'tyylit/omateema.css';
	}
	else {
		console.log("Theme not supported, using 'normal'");
		$(self.options.parent).addClass("normal");
		style = this.options.url + 'tyylit/omateema.css';
	}
	
	var count = $("[id^=mathdriller-style]").length + 1; 

	$('head').append('<link id="mathdriller-style'+(count+1)+'" rel="stylesheet" href="tyylit/perusteema.css">');	
	$('head').append('<link id="mathdriller-style'+count+'" rel="stylesheet" href="'+ style +'">');
}


Ladder.prototype.checkQuestions = function() {
	var self = this;

	for(var i=0; i<self.options.data.length; i++) {
		var options = self.options.data[i].optionsList; 
		var correct = self.options.data[i].correct;

		if (!self.isIn(options, correct)) {

			if(options.length < self.options.nOptions) {
				options.push(correct);
			}
			else {
				options = self.shuffle(options); 
				options[0] = correct; 
			}
			options = self.shuffle(options);
			self.options.data[i].optionsList = options;
		}

	}
}

Ladder.prototype.resize = function() {
	var self = this;

	$(self.options.element).width(parseFloat($(window).width()) - parseFloat($(self.options.parent).offset().left)-4 + 'px');
	$(self.options.element).height(parseFloat($(window).height()) - parseFloat($(self.options.parent).offset().top)-4 + 'px');
	$(self.options.parent).width($(self.options.element).width());
	$(self.options.parent).height($(self.options.element).height());
	$(self.options.element).css({'overflow': 'hidden', 'padding': '0', 'margin': '0', 'font-size': '4vh'});
}

Ladder.prototype.prepareLevels = function() {
	var self = this; 

	self.checkQuestions();

	self.levels = [];

	// add levels
	for(var i=0; i<self.options.data.length; i++) {
		
		var level = $('<div class="ground question' + i + ' level'+self.randomInt(1,5)+'" style="z-index: '+ (998 - i) +'"></div>');
		var options = self.shuffleOptions(self.options.data[i].optionsList, self.options.data[i].correct);

			// add options per level
			for (var j=0; j<self.options.nOptions; j++) {
	
				var pos = 100/self.options.nOptions * (j) - j*8 + 13; 

				if(i%2 != 0) {
					var pos = 100/self.options.nOptions * (j) - j*8 +3; 
				}

				var option = $('<div class="option item'+j+'" data-level="'+i+'" style="left: ' + pos + 'vw"><div class="optionLabel" data-option="'+encodeURIComponent(options[j])+'">'+options[j]+'</div></div>');
						

				// Option click-listener!
				option.click(function(e) {
					var level = $(this).attr('data-level');
					self.timeEnd = Date.now();

					// first make sure that clicking is accepted!
					if(self.isClickable && !self.isGameOver && (level == self.currentQuestion) && $(this).attr('data-isClicked') != 'true') {
						self.isClickable = false;
						var answer = decodeURIComponent($(this).find('.optionLabel').attr('data-option'));
						var clickedLevel = $(this);
						$(this).attr('data-isClicked', 'true');

						var callback = function() {
							// PLAY THE OPTION OR JUST MOVE ON! 							
							if(self.options.data[level].correct === answer) {
								clickedLevel.addClass('correct');
								
								self.correctAnswer(answer);
							}

							else {
								clickedLevel.addClass('incorrect');
								self.wrongAnswer(answer);
							}	
						}

						if(!self.onOption) { 
							self.moveCharacterTo($(this).css('left'), callback);
						}
						else {
							console.log("just callback");
							callback();
						}

					}

					// remove selected option
					// selection happens with keyboard
					self.onOption = false;
				});

				level.append(option);
				
			}		


		self.levels.push(level);
	}
}

Ladder.prototype.drawProgressbar = function() {
	var self = this; 
	self.progressbar = $('<div class="progressbar"><span></span></div>')
	self.options.parent.append(self.progressbar);
}

Ladder.prototype.setProgress = function() {
	var self = this;
	$(self.progressbar).find('span').width(self.currentQuestion/self.options.data.length * 100 + "%")
}

Ladder.prototype.drawLevels = function() {
	var self = this; 

	var n = self.options.data.length;

	for(var i=0; i<n; i++) {
		var level = self.levels.shift();
		level.css( {'bottom': (i)*self.LEVEL_HEIGHT + 3 +'vw'} );
		self.options.parent.append(level)
	}

}

Ladder.prototype.correctAnswer = function(answer) {
	var self = this;

	var dLevel = self.LEVEL_HEIGHT * $(window).width()/100; 

	self.points += parseInt(self.options.pointsPerQuestion);

	self.sound.play('correct');
	self.answers.push({'question': self.options.data[self.currentQuestion].question, 'answer': answer, 'correct': self.options.data[self.currentQuestion].correct, 'time': (self.timeEnd - self.timeStart)});
	self.options.callback({'points': parseInt(self.points), 'answers': self.answers});

	self.currentQuestion++;


	// add score
	self.addPoints();
	// move progressbar
	self.setProgress();

	self.timeStart = Date.now();


	// If there's more levels
	if(self.currentQuestion < self.options.data.length) {

		$('.ground').each(function(index) {
			var oldBottom = parseFloat($(this).css('bottom')); 
			if(oldBottom < -dLevel) {
				$(this).remove();
			}
			else {
				$(this).css('bottom', (oldBottom - dLevel) + 'px');
			}
		});
		
		self.character.removeClass('onLadder');

		// limit clicking 
		$(".ground").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
			function(e) {
				self.isClickable = true;
				self.setNextQuestion();
				// Add playButton.Click functionality to set next question
			});
	}

	else {
		self.gameOver();
	}
}

Ladder.prototype.wrongAnswer = function(answer) {
	var self = this;

	self.sound.play('wrong');
	self.character.addClass('characterBlink');

//	self.options.callback({'question': self.options.data[self.currentQuestion], 'answer': answer, 'time': (self.timeEnd - self.timeStart)});
//	self.answers.push({'question': self.options.data[self.currentQuestion], 'answer': answer, 'time': (self.timeEnd - self.timeStart)});
	self.answers.push({'question': self.options.data[self.currentQuestion].question, 'answer': answer, 'correct': self.options.data[self.currentQuestion].correct, 'time': (self.timeEnd - self.timeStart)});

	self.options.callback({points: self.points, answers: self.answers});
	
	self.timeStart = Date.now();
	self.removeLife();
}

Ladder.prototype.drawQuestionArea = function() {
	var self = this;
	if(self.isAudio) {
		self.playButton = $('<div class="play"></div>'); 
		self.playButton.click(function(e) {
			e.preventDefault();

			if(!self.isPlaying) {

				// play pre-question and question
				if(self.options.data[self.currentQuestion].preQuestion != '') {
					console.log("pre-question");
					self.isPlaying = true;
					$(this).addClass('playing');

					var preSound = self.options.data[self.currentQuestion].preQuestion; 
					
					self.preQuestionAudio = new Howl({
						urls: [preSound],
						autoplay: true,
						onend: function() {
							
							self.isPlaying = false; 

							if(self.options.data[self.currentQuestion].question != '') {
								self.isPlaying = true; 
								var sound2 = self.options.data[self.currentQuestion].question;
							
								self.questionAudio = new Howl({
									urls: [sound2],
									autoplay: true, 
									onend: function() {
										self.isPlaying = false;
										$('.play').removeClass('playing');
										self.timeStart = Date.now();	
									}
								});

							}
							// no furether questions
							else {
								self.timeStart = Date.now();
								$('.play').removeClass('playing');
								self.isPlaying = false; 

							}
						
						}
					});

				}

				// play just the question
				else {
					self.isPlaying = true;
					$(this).addClass('playing');
					var sound = self.options.data[self.currentQuestion].question;
					
					self.questionAudio = new Howl({
						urls: [sound],
						autoplay: true, 
						onend: function() {
							self.isPlaying = false;
							$('.play').removeClass('playing');
							self.timeStart = Date.now();
						}
					});
				}
			}
	});

	self.options.parent.append(self.playButton);
	}
	else {
		self.question = $('<div class="question"></div>'); 
		self.options.parent.append(self.question);
	}
}

Ladder.prototype.setNextQuestion = function() {
	var self = this;
	if(self.isAudio) {
		self.playButton.click(); 
	}
	else {
		self.question.html(self.options.data[self.currentQuestion].question);
	}
}

Ladder.prototype.drawHealth = function() {
	var self = this; 

	self.options.parent.append('<div class="lifes"></div>')

	for(var i=0; i<self.options.lifes; i++) {
		$('.lifes').append('<div class="health"></div>');
	}

}

Ladder.prototype.drawScore = function() {
	var self = this; 
	var score = $('<div class="score"><span class="currentScore">0</span></div>')
	self.options.parent.append(score);
}

Ladder.prototype.removeLife = function() {
	var self = this; 
	if(self.options.lifes > 0) {
		self.options.lifes--; 
		var nHearts = $('.health').length - $('.healthUsed').length;
		$($('.health')[nHearts-1]).addClass('blink');


		setTimeout(function() {
			$($('.health')[nHearts-1]).addClass('healthUsed');

			//make character red
			self.character.removeClass('characterBlink');
			// don't let player continue, until hearts are faded out
			self.isClickable = true;

		}, 1200);

	}
	else {
		self.gameOver();
	}

}

Ladder.prototype.gameOver = function() {
	var self = this;
	self.isClickable = false;
	self.isGameOver = true;
	self.options.endOfGame({submit: true});
	// alert("Game over! <br/> You got: ", self.points);
}

Ladder.prototype.drawCharacter = function() {
	var self = this;

	self.character = $('<div class="character"></div>');
	self.options.parent.append(self.character);

}

Ladder.prototype.moveCharacterTo = function(newPos, callback) {
	var self = this; 
	self.character.addClass('jump');
	self.character.css({'left': parseFloat(newPos)+ ($(window).width()/100 * 11.5) + 'px' });

	self.sound.play('jump');
	// run callback after movement is stopped.
	self.character.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(e) {
		if(e.originalEvent.propertyName === 'left') {
			self.character.addClass('onLadder');
			$(this).removeClass('jump');
			callback();
			$(this).off(e);
		}

	});

}

Ladder.prototype.moveCharacterToWithOutJump = function(direction) {
	var self = this; 

	var options = $( ".option[data-level='"+self.currentQuestion+"']" );
	var currentPosition = parseFloat(self.character.css('left')) - ($(window).width()/100 * 11.5);

	var newPos = 0; 
	for( var i=0; i<options.length; i++) {

		var left = parseFloat($(options[i]).css('left')); 
		if(direction === 'left') {
			if(left < (currentPosition-1) && left > newPos) {
				newPos = left; 
				self.onOption = $(options[i]); 
			}
		}
		else {
			if(left > (currentPosition + 1) && (left < newPos || newPos === 0)) {
				newPos = left; 
				self.onOption = $(options[i]); 
			}
		}
	} 

	if(newPos > 0) {
		self.character.removeClass('onLadder');
		self.character.css({'left': parseFloat(newPos)+ ($(window).width()/100 * 11.5) + 'px' });
	}

	// run callback after movement is stopped.
	self.character.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(e) {
		if(e.originalEvent.propertyName === 'left') {
			self.character.addClass('onLadder');
			$(this).off(e);
		}

	});

}

Ladder.prototype.addPoints = function() {
	var self = this; 
	var next = (parseInt($('.currentScore').html()) + self.options.pointsPerQuestion);
	self.sound.play('score');
    $('.currentScore').animateNumbers(next, false, 1000, 'swing');

}

Ladder.prototype.shuffleOptions = function(options, correct) {
	var self = this; 
	var arr = []; 

	options = self.shuffle(options);
	var isCorrect = false;

	for(var i=0; i<self.options.nOptions; i++) {
		arr.push(options[i]);
		if(options[i] === correct) {
			isCorrect = true;
		}
	}

	if(!isCorrect) {
		arr[0] = correct;
	}

	arr = self.shuffle(arr);

	return arr;
}



Ladder.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Ladder.prototype.isIn = function(arr, node) {
	for (var i=0; i<arr.length; i++) {
		if(arr[i] == node) {
			return true; 
		}
	}
	return false;
}

Ladder.prototype.shuffle = function(array) {

	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}

	return array;
}

Ladder.prototype.parseAudioFileFromLabel = function(label) {
	var self = this; 

	var lastPart = label.split("/").pop();
	if(lastPart.indexOf('.') !== -1) {
		var result = lastPart.substring(0, lastPart.indexOf('.')); 
	}
	else {
		var result = lastPart;
	}

	result = result.toLowerCase(); 

	switch(result) {
		case 'ä': 	result = 'a_um';
					break; 
		case 'ö': 	result = 'o_um'; 
					break; 
		case 'å': 	result = 'ruots_o'; 
					break; 
		default: 		result = result; 
	}
	if(self.options.lang === 'Suomi') {
		result = 'fi/' + result; 
	}
	else if(self.options.lang === 'English') {
		result = 'en/' + result; 
	}
	console.log(result);

	return result;
}



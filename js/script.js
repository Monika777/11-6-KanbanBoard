$(function(){
	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    for (var i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

//Column//
	function Column(name) {
		var self = this; // useful for nested functions

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn(){
			// here is the code for creating components of columns
			var $column = $('<div>').addClass('column ');
			var $columnTitle = $('<h2>').addClass('column-title ').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete label label-primary').text('x');
			var $columnAddCard = $('<button>').addClass('add-card btn btn-default').text('Add a card');	
			
			// adding events
			$columnDelete.click(function() {
				self.removeColumn();
			});
			 //Add a note after clicking on the button:
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});
			//construction column element /połączenie wszystkich elementow w odpowiedniej kolejności
			$column.append($columnDelete)
					.append($columnTitle)
	        		.append($columnAddCard)
	        		.append($columnCardList);
	        //return of created column
			return $column;
		}
	}   //kod umiesc pod klasa kolumn
		Column.prototype = {
    		addCard: function(card) {
      			this.$element.children('ul').append(card.$element);
   			 },
    		removeColumn: function() {
      			this.$element.remove();
   			 }
		};
// end Column //

// Card //
	function Card (description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			// Implementation of card creation
			var $card = $('<li>').addClass('list-group-item');
		    var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		    var $cardDelete = $('<button>').addClass('cardDelete').text('x');
		     // binding to click event
		    $cardDelete.click(function() {
		    	self.removeCard();
		    });
		    //combining blocks and returning the card
		    $card.append($cardDelete)
				 .append($cardDescription);
			return $card;
		}
	}	//remove card method
		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
		}
		}
	
//nasluchiwanie zdarzen na tablicy
	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	}
//funkcja sortujaca z java ui - sortowanie i przeciaganie elementow
	function initSortable() {
	   $('.column-card-list').sortable({
	     connectWith: '.column-card-list',
	     placeholder: 'card-placeholder'
	   }).disableSelection();
	};
// wrzucanie nowej kolumny do tablicy
	 $('.create-column').click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
	    	board.addColumn(column);
  	});
//CREATING COLUMNS TWORZENIE KOLUMN
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

//ADDING COLUMNS TO THE BOARD DODANIE KOLUMN NA TABLICĘ
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

//CREATING CARDS TWORZENIE KART
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');
	var card3 = new Card('JQuery module');

//ADDING CARDS TO COLUMNS DODANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);	 
	doneColumn.addCard(card3);

});
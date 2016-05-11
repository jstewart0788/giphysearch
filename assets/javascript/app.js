
	// Initial array of clubs
	var clubs = ['Manchester City', 'FC Barcelona', 'Bayern Munich', 'Real Madrid', 'Juventus'];

	// ========================================================

	// displayClubInfo function re-renders the HTML to display the appropriate content. 
	function displayClubInfo(){

		var club = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ club +"&api_key=dc6zaTOxFJmzC&limit=10";
		
		// Creates AJAX call for the specific club being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			console.log(response);

			$('#clubView').empty();


			for(var i = 0; i < response.data.length; i++)
			{
			
				// Creates a generic div to hold the club
				var clubDiv = $('<div class="clubDiv">');

				// Retrieves the Rating Data
				var rating = response.data[i].rating;

				// Creates an element to have the rating displayed
				var pOne = $('<p>').text( "Rating: " + rating);

				// Displays the rrating
				clubDiv.append(pOne);

				// Creates an element to hold the image 
				var image = $('<img>').attr("src", response.data[i].images.fixed_height_still.url);
				image = $(image).attr("data-still", response.data[i].images.fixed_height_still.url);
				image = $(image).attr("data-animate", response.data[i].images.fixed_height.url);
				image = $(image).attr("data-state", "still");
				image = $(image).attr("class", "FCImage");

				// Appends the image
				clubDiv.append(image);

				// Puts the entire club above the previous movies.
				$('#clubView').append(clubDiv);
			}
			
		});

	}

	// ========================================================

	// Generic function for displaying club data 
	function renderButtons(){ 

		// clears previous buttons
		$('#buttonsView').empty();

		// Loops through the array of club
		for (var i = 0; i < clubs.length; i++){

			// Then dynamicaly generates buttons for each club in the array

		    var a = $('<button>') 
		    a.addClass('club'); 
		    a.attr('data-name', clubs[i]); 
		    a.text(clubs[i]); 
		    $('#buttonsView').append(a); 
		}
	}

	$(document).on('click', '.FCImage' , function(){

            var state = $(this).attr("data-state");


            if(state == 'still')
            {

                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "animate");
            }
            else
            {

                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "still");
            }

	    });

	// This function handles events where one button is clicked
	$('#addClub').on('click', function(){

		// This line of code will grab the input from the textbox
		var club = $('#club-input').val().trim();

		// The club from the textbox is then added to our array
		clubs.push(club);
		
		// Our array then runs which handles the processing of our club array
		renderButtons();

		return false;
	})

	// ========================================================

	// Generic function for displaying the clubInfo
	$(document).on('click', '.club', displayClubInfo);


	// ========================================================

	// This calls the renderButtons() function
	renderButtons();


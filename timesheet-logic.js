// Steps to complete:
/*
1. Initialize Firebase
2. Create button for adding new trains - then update the html + update the database
3. Create a way to retrieve trains from the train database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCW3PhDG6AbNLgyNoEPlUl-sdc_qw0GCJI",
    authDomain: "train-time-d8a45.firebaseapp.com",
    databaseURL: "https://train-time-d8a45.firebaseio.com",
    storageBucket: "train-time-d8a45.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var traindestination = $("#destinationInput").val().trim();
	var trainStart = moment($("#startInput").val().trim(), "HH:mm").format("X");
	var trainFrequency = $("#frequencyInput").val().trim();

	// Creates local "ttrainorary" object for holding train data
	var newtrain = {
		name:  trainName,
		destination: traindestination,
		start: trainStart,
		frequency: trainFrequency
	}

	// Uploads train data to the database
	database.ref().push(newtrain);

	// // Logs everything to console
	// console.log(newtrain.name);
	// console.log(newtrain.destination);
	// console.log(newtrain.start);
	// console.log(newtrain.frequency)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#startInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var traindestination = childSnapshot.val().destination;
	var trainStart = childSnapshot.val().start;
	console.log(trainStart);
	var trainFrequency = childSnapshot.val().frequency;

			// var firstTime = "03:30"; // Time is 3:30 AM

		// First Time (pushed back 1 year to make sure it comes before current time)
		var trainStartConverted = moment(trainStart, "X").subtract(1, "years");
		console.log(trainStartConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(trainStartConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % trainFrequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = trainFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
		nextTrainPretty = moment(nextTrain).format("hh:mm A");

	// train Info
	console.log(trainName);
	console.log(traindestination);
	console.log(trainStartConverted);
	console.log(trainFrequency);

	// Prettify the train start
	var trainStartPretty = moment.unix(trainStartConverted).format("HH:mm");


	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain);

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any atttraint we use mets this test case


	// <script>
		// Assume the following situations.

		// (TEST 1)
		// First Train of the Day is 3:00 AM
		// Assume Train comes every 3 minutes.
		// Assume the current time is 3:16 AM....
		// What time would the next train be...? (Use your brain first)
		// It would be 3:18 -- 2 minutes away

		// (TEST 2)
		// First Train of the Day is 3:00 AM
		// Assume Train comes every 7 minutes.
		// Assume the current time is 3:16 AM....
		// What time would the next train be...? (Use your brain first)
		// It would be 3:21 -- 5 minutes away


		// ==========================================================

		// Solved Mathematically
		// Test case 1:
		// 16 - 00 = 16
		// 16 % 3 = 1 (Modulus is the remainder)
		// 3 - 1 = 2 minutes away
		// 2 + 3:16 = 3:18

		// Solved Mathematically
		// Test case 2:
		// 16 - 00 = 16
		// 16 % 7 = 2 (Modulus is the remainder)
		// 7 - 2 = 5 minutes away
		// 5 + 3:16 = 3:21

		// Assumptions
		// var tFrequency = 3;

	// </script>




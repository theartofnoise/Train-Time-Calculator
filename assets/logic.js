$(document).ready(function (){


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCYWz985eSXKpif1ltEE2u8u8Ej8SPReBg",
    authDomain: "train-time-calculator-573f1.firebaseapp.com",
    databaseURL: "https://train-time-calculator-573f1.firebaseio.com",
    projectId: "train-time-calculator-573f1",
    storageBucket: "train-time-calculator-573f1.appspot.com",
    messagingSenderId: "558877779971"
  };
  firebase.initializeApp(config);

  var db = firebase.database().ref();

  $("#submit").on("click", function(event) {
    event.preventDefault();

    var tName = $("#tName");
    var tDestination = $("#destination");
    var freq = $("#freq");
    var FTT = $("#FTT");

    var newTrain = {
        name: tName.val(),
        destination: tDestination.val(),
        frequency: freq.val(),
        FirstTrainTime:FTT.val()

    }
    
    db.push(newTrain);

    console.log(newTrain);
    tName.val("");
    tDestination.val("");
    freq.val("");
    FTT.val("");
    
  });

  db.on("child_added", function(childSnap) {

      var newRow = "<tr><td>" + childSnap.val().name + "</td><td>" + childSnap.val().destination + "</td><td>" + childSnap.val().frequency + "</td><td>" + "next trizane" + "</td><td>" + "minz away" + "</td></tr>"
      
      $('#topRow').append(newRow);
    

  }, function(errorObject) {
    console.log('Error: ' + errorObject);
});


});

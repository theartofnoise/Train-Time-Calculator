$(document).ready(function (){
    function setTime() {
    var now = moment().format("dddd, MMMM Do YYYY, HH:mm:ss");
    $("#timeNow").text(now);
};
setInterval(setTime, 1000);


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
    
    // timeConversion();
    db.push(newTrain);

    console.log(newTrain);
    tName.val("");
    tDestination.val("");
    freq.val("");
    FTT.val("");
    
  });

  //Time conversion
//   function timeConversion(startT, freqT) {
//       var now = moment().format("LT")
//       console.log(now);
//       var lastYearStartT = moment(startT,"LT").subtract(1, "years").format("LT");
//       console.log("start last year: "+lastYearStartT);
//       console.log("freqT: "+ freqT);
//       var diffT = moment().subtract(startT, "LT").format("m");
//       console.log("diff: " + diffT);
//       var r = diffT % freqT;
//       console.log("r: "+r);
//       var minsAway = freqT - r;
//       console.log("mins away: "+minsAway);
//       var arriveT = moment().add(minsAway, "m").format("LT");
//       console.log("arriveT: "+arriveT);
      
//   };
  
  db.on("child_added", function(childSnap, arriveT, minsAway) {
        //time conversion
        var startT = childSnap.val().FirstTrainTime;
        var freqT = childSnap.val().frequency;
        var now = moment().format("HH:mm")
      console.log(now);
      var lastYearStartT = moment(startT,"HH:mm").subtract(1, "years").format("HH:mm");
      console.log("start last year: "+lastYearStartT);
      console.log("freqT: "+ freqT);
      var diffT = moment().subtract(startT, "HH:mm").format("m");
      console.log("diff: " + diffT);
      var r = diffT % freqT;
      console.log("r: "+r);
      var minsAway = freqT - r;
      console.log("mins away: "+minsAway);
      var arriveT = moment().add(minsAway, "m").format("HH:mm");
      console.log("arriveT: "+arriveT);
      
      var newRow = "<tr><td>" + childSnap.val().name + "</td><td>" + childSnap.val().destination + "</td><td>" + childSnap.val().frequency + "</td><td>" + minsAway + "</td><td>" + arriveT + "</td></tr>"
    //   console.log(freqT);
    //   timeConversion(startT, freqT);
      $('#topRow').append(newRow);
      
    }, function(errorObject) {
        console.log('Error: ' + errorObject);
    });

    
});

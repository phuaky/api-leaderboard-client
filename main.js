$("document").ready(function(){
  getScoreboard();

  //Add click listener to buttons
  $(".container").on("click", ".add", addEntry);
  $(".container").on("click", ".edit", editEntry);
  $(".container").on("click", ".delete", deleteEntry);
  $(".container").on("click", ".update", updateEntry);
});


//FUNCTIONS BELOW HERE
function getScoreboard() {
  $.ajax({
    url: "http://localhost:3000/entries",
    type: "GET"
  }).done(function(serverResponse){
    displayScoreboard(serverResponse);
  }).fail(function(){
    console.log("loading failed");
  })
}

function displayScoreboard(data) {
  //Empty the container
  $(".container").empty();

  $(".container").append(
    "<div class='row'>" +
      "<div class='col-md-4'><strong>Name</strong></div>" +
      "<div class='col-md-2'><strong>Initials</strong></div>" +
      "<div class='col-md-2'><strong>Score</strong></div>" +
      "<div class='col-md-2'></div>" +
      "<div class='col-md-2'></div>" +
    "</div>"
  );

  //Edit row
  $(".container").append(
    "<div class='row'>" +
      "<div class='col-md-4'><input class='form-control' type='text' id='addname' /></div>" +
      "<div class='col-md-2'><input class='form-control' type='text' id='addinitials' /></div>" +
      "<div class='col-md-2'><input class='form-control' type='number' id='addscore' /></div>" +
      "<div class='col-md-2'><button class='btn btn-default add' value='add''>Add</button></div>" +
      "<div class='col-md-2'></div>" +
    "</div>"
  );

  data.forEach(function(element, index) {
    $(".container").append(
      "<div class='row' id='row" + element.id + "'>" +
        "<div class='col-md-4' id='name" + element.id + "'>" + element.name + "</div>" +
        "<div class='col-md-2' id='initials" + element.id + "'>" + element.initials + "</div>" +
        "<div class='col-md-2' id='score" + element.id + "'>" + element.score + "</div>" +
        "<div class='col-md-2'><button class='btn btn-default edit' value='" + element.id + "'>Edit</button></div>" +
        "<div class='col-md-2'><button class='btn btn-default delete' value='" + element.id + "'>Delete</button></div>" +
      "</div>"
    );
  });
}

function deleteEntry() {
  $.ajax({
    url: "http://localhost:3000/entries/" + this.value,
    type: "DELETE"
  }).done(function(serverResponse){
    displayScoreboard(serverResponse);
  }).fail(function(){
    console.log("loading failed");
  })
}

function editEntry() {
  var rowID = "#row" + this.value;
  var nameID = "#name" + this.value;
  var initialsID = "#initials" + this.value;
  var scoreID = "#score" + this.value;
  var name = $(nameID).text();
  var initials = $(initialsID).text();
  var score = $(scoreID).text();

  $(rowID).empty();
  $(rowID).append(
    "<div class='col-md-4'><input class='form-control' type='text' value='" + name + "' id='name" + this.value + "' /></div>" +
    "<div class='col-md-2'><input class='form-control' type='text' value='" + initials + "' id='initials" + this.value + "' /></div>" +
    "<div class='col-md-2'><input class='form-control' type='number' value='" + score + "' id='score" + this.value + "' /></div>" +
    "<div class='col-md-2'><button class='btn btn-default update' value='" + this.value + "'>Update</button></div>" +
    "<div class='col-md-2'><button class='btn btn-default delete' value='" + this.value + "'>Delete</button></div>"
  );
}

function updateEntry() {
  var nameID = "#name" + this.value;
  var initialsID = "#initials" + this.value;
  var scoreID = "#score" + this.value;
  var entry = {name: $(nameID).val(),
              initials: $(initialsID).val(),
              score: $(scoreID).val()};

  $.ajax({
    url: "http://localhost:3000/entries/" + this.value,
    type: "PUT",
    data: {entry: entry}
  }).done(function(serverResponse){
    displayScoreboard(serverResponse);
  }).fail(function(){
    console.log("loading failed");
  })
}

function addEntry() {
  var entry = {name: $("#addname").val(),
              initials: $("#addinitials").val(),
              score: $("#addscore").val()};

  $.ajax({
    url: "http://localhost:3000/entries/",
    type: "POST",
    data: {entry: entry}
  }).done(function(serverResponse){
    displayScoreboard(serverResponse);
  }).fail(function(){
    console.log("loading failed");
  })
}

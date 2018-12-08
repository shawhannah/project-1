// Global Variables
var zipcode;
var movieArr;
var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
var zomatoArr;

// DOM Reference Variables
var submitButton = $("#submit-button");
var userInput = $("#user-input");
var searchDiv = $("#search-div-formatting");
var errorMessage = $("<p>")
  .attr("id", "error-message")
  .text("Please enter a valid ZIP Code");
var movieDiv = $("#moviedb-div");
var zomatoDiv = $("#zomato-div");

// Submit Button with Zip Code Validation
submitButton.on("click", function(e) {
  e.preventDefault();
  if (!isValidZip.test(userInput.val().trim())) {
    searchDiv.append(errorMessage.slideDown());
  } else {
    errorMessage.slideUp();
    zipcode = userInput.val().trim();
    $("#zipcode").text(zipcode);
    userInput.val("");
    console.log("var zipcode = " + zipcode);

    formatWebpage();

    $("#zipcode-alert").css("display", "block");
    $("#main-grid").css("min-height", "calc(100vh - 80px)");
    movieDiv.css("display", "grid");
    zomatoDiv.css("display", "grid");
    $("#search-div").css("grid-row", "2 / span 1");
    $("footer").css("display", "flex");

    // ajax call for movies

    $.ajax({
      url: "https://api.themoviedb.org/3/movie/now_playing",
      data: {
        api_key: "b9a61052b8eb1f78c85667deffc9b7aa",
        language: "en-US",
        region: "us",
        page: "1"
      },
      method: "GET"
    }).then(function(response) {
      movieArr = response.results;
      showMovies(movieArr);
    });
    // ajax call for food
    $.ajax({
      url:
        "https://developers.zomato.com/api/v2.1/search?q=27615&apikey=b33efca80e6e3f8b5a3cfaf40c6ad1f4",
      method: "GET"
    });
  }
});

// This function reformats landing page
function formatWebpage() {
  $("#userLogin").css("display", "none");
  $("#search-div-formatting").css("display", "flex");
  $("#cinegrub-intro").css("display", "none");
  $("#cinegrub-logo").css("display", "initial");
  $("#cinegrub-intro-logo").css("display", "none");
}

// Function for getting MovieDb API data
function showMovies(array) {
  movieDiv.empty();

  for (let i in array) {
    var movieInnerDiv = $("<div>").addClass("movie-divs");

    var moviePosterLink = $("<a>").attr({
      href:
        "https://www.fandango.com/search?q=" + array[i].title + "&mode=general",
      target: "_blank"
    });
    var moviePoster = $("<img>").attr({
      src: "https://image.tmdb.org/t/p/w200/" + array[i].poster_path,
      alt: "Movie Poster of " + array[i].title,
      class: "movie-posters"
    });
    moviePosterLink.append(moviePoster);

    var movieScoreDiv = $("<div>").addClass("movie-ratings");
    var movieScore = Math.round(array[i].vote_average);

    switch (movieScore) {
      case 1:
        movieScoreDiv.append(
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 2:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 3:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 4:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 5:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 6:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 7:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 8:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 9:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star-half-alt")
        );
        break;
      case 10:
        movieScoreDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star")
        );
        break;

      default:
        movieScoreDiv.append(
          $("<p>")
            .text("No Reviews")
            .addClass("no-user-ratings")
        );
    }

    var movieTitle = $("<p>")
      .addClass("movie-titles")
      .text(array[i].title);
    var movieReleaseDate = $("<p>")
      .addClass("release-dates")
      .text("Released " + array[i].release_date);

    var movieAvailabilityLink = $("<a>").attr({
      href: "https://www.fandango.com/" + zipcode + "_movietimes",
      target: "_blank"
    });
    var movieAvailability = $("<p>")
      .addClass("check-availability")
      .text("Check Availability");
    movieAvailabilityLink.append(movieAvailability);

    movieInnerDiv.append(
      moviePosterLink,
      movieScoreDiv,
      movieTitle,
      movieReleaseDate,
      movieAvailabilityLink
    );
    movieDiv.append(movieInnerDiv);
  }
}

// Login & Password Functionality
if (localStorage.getItem("login") !== null) {
  console.log(localStorage.getItem("login").length);
  showUserName();
  formatWebpage();
}

var config = {
  apiKey: "AIzaSyD3_PKioxYnnZv67H5XrE5iQxpSbVNOzPc",
  authDomain: "cinegrub-c849c.firebaseapp.com",
  databaseURL: "https://cinegrub-c849c.firebaseio.com",
  projectId: "cinegrub-c849c",
  storageBucket: "cinegrub-c849c.appspot.com",
  messagingSenderId: "893203931783"
};
firebase.initializeApp(config);
var database = firebase.database();

function showUserName() {
  $("#userLogin").css("display", "none");
  $("#dropdownMenuButton").text(localStorage.getItem("login"));
  $(".dropdown").css("display", "block");
  $("#login").val("");
  $("#password").val("");
}

function setLocalStorage() {
  localStorage.setItem(
    "login",
    $("#login")
      .val()
      .trim()
  );
  showUserName();
}

$("#register").on("click", function(e) {
  e.preventDefault();
  if (
    $("#login")
      .val()
      .trim() !== "" &&
    $("#password")
      .val()
      .trim() !== ""
  ) {
    database.ref("users").push({
      login: $("#login")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    });
    setLocalStorage();
    formatWebpage();
  } else {
    swal("The username or password is missing."); // SweetAlert.js
  }
});

$(document).on("click", "#signOut", function() {
  localStorage.clear();
});

$(document).on("click", "#signIn", function(e) {
  e.preventDefault();
  var login = $("#login")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();
  database
    .ref("users")
    .orderByChild("login")
    .equalTo(login)
    .limitToLast(1)
    .on("value", function(snapshot) {
      console.log(snapshot.val());
      if (snapshot.val() === null) {
        swal(
          "The email or phone number you’ve entered doesn’t match any account."
        );
      } else {
        var key = Object.keys(snapshot.val());
        var db_login = snapshot.val()[key].login;
        var db_password = snapshot.val()[key].password;
        setLocalStorage();
        formatWebpage();
      }
    });
});

// Function for getting Zomato API data
function showFood(array) {
  zomatoDiv.empty();
  for (let i in array) {
    var zomatoInnerDiv = $("<div>").addClass("restaurant-divs");

    var foodName = $("div").addClass("restaurant-names");

    var foodRatingDiv = $("<div>").addClass("restaurant-ratings");
    var foodRating = Math.round(array[i].vote_average);

    switch (foodRating) {
      // case 0 = No Reviews
      case 0:
        foodRatingDiv.append(
          $("<p>")
            .text("No Reviews")
            .addClass("no-user-ratings")
        );
        break;
      // case 1 = 1 star
      case 1:
        foodRatingDiv.append(
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa star")
        );
        break;
      // case 2 = 2 stars
      case 2:
        foodRatingDiv.append(
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa star")
        );
        break;
      // case 3 = 3 stars
      case 3:
        foodRatingDiv.append(
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa star")
        );
        break;
      // case 4 = 4 stars
      case 4:
        foodRatingDiv.append(
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa star")
        );
        break;
      // case 5 = 5 stars
      case 5:
        foodRatingDiv.append(
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("far fa star"),
          $("<i>").addClass("fas fa-star-half-alt"),
          $("<i>").addClass("far fa star")
        );
    }
  }
}

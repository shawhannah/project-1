// Global Variables
var zipcode;
var movieArr;
var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
// DOM Reference Variables
var submitButton = $("#submit-button");
var userInput = $("#user-input");
var searchDiv = $("#search-div-formatting");
var errorMessage = $("<p>")
  .attr("id", "error-message")
  .text("Please enter a valid ZIP Code");
var movieDiv = $("#moviedb-div");
var zomatoDiv = $("#zomato-div");

// Everytime a page is refreshed or entered, the preloader will activate
$(window).on("load", function() {
  $("#preloader").css("display", "none");
});

// The function will create a loader screen to allow the DOM to load uninterrupted for 1s
function preloader() {
  $("#preloader").css("display", "flex");
  setTimeout(function() {
    $("#preloader").css("display", "none");
  }, 1000);
}

// Submit Button with Zip Code Validation
submitButton.on("click", function(e) {
  e.preventDefault();

  preloader();
  setTimeout(function() {
    if (!isValidZip.test(userInput.val().trim())) {
      searchDiv.append(errorMessage.slideDown());
    } else {
      errorMessage.slideUp();
      zipcode = userInput.val().trim();
      $("#zipcode").text(zipcode);
      userInput.val("");

      formatWebpage();
      $("#zipcode-alert").css("display", "block");
      $("#main-grid").css("min-height", "calc(100vh - 80px)");
      movieDiv.css("display", "grid");
      zomatoDiv.css("display", "grid");
      $("#search-div").css("grid-row", "2 / span 1");
      $("footer").css("display", "flex");

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
    }
  }, 1000);
});

// This function reformats landing page
function formatWebpage() {
  $("#head-title").text("CineGrub");
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

    var addFavButton = $("<img>").attr({
      class: "addToFavMovie",
      src: "assets/images/plussign.jpg",
      alt: "Add To Favorites Button"
    });

    movieInnerDiv.append(
      moviePosterLink,
      movieScoreDiv,
      movieTitle,
      movieReleaseDate,
      movieAvailabilityLink,
      addFavButton
    );
    movieDiv.append(movieInnerDiv);
  }
}

// Login & Password Functionality
if (localStorage.getItem("login") !== null) {
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
  $(".dropdown").css("display", "block");
  $("#dropdownMenuButton").text(localStorage.getItem("login"));
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
    database
      .ref("users")
      .orderByChild("login")
      .equalTo($("#login").val())
      .once("value", function(snapshot) {
        var key;

        snapshot.forEach(function(childSnapshot) {
          key = childSnapshot.key;
          return true;
        });

        if (key) {
          swal("Sorry, this username has already been taken.");
        } else {
          preloader();
          setTimeout(function() {
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
          }, 1000);
        }
      });
  } else {
    swal("A username and password is required for registration.");
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
    .on("value", function(snapshot) {
      if (snapshot.val() === null || login === "") {
        swal(
          "An error has occured while attempting to log in. Please try again."
        );
      } else {
        var key = Object.keys(snapshot.val());
        var db_login = snapshot.val()[key].login;
        var db_password = snapshot.val()[key].password;
        if (db_login === login && db_password === password) {
          preloader();
          setTimeout(function() {
            setLocalStorage();
            formatWebpage();
          }, 1000);
        } else {
          swal("Password is incorrect.");
        }
      }
    });
});

// ANIMEjs - Wraps every letter in a span to animate each one individually
$("#cinegrub-intro").css("visibility", "visible");

$(".ml9 .letters").each(function() {
  $(this).html(
    $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
  );
});

anime.timeline({ loop: false }).add({
  targets: ".ml9 .letter",
  scale: [0, 1],
  duration: 1500,
  elasticity: 600,
  delay: function(el, i) {
    return 45 * (i + 1);
  }
});

// add movie card to your account

var addedMovieCard;

$(document).on("click", ".addToFavMovie", function() {
  var movieCard = {
    link: $(this)
      .parent(".movie-divs")
      .find("a")
      .attr("href"),
    poster: $(this)
      .closest(".movie-divs")
      .find("img")
      .attr("src"),
    rate: $(this)
      .closest(".movie-divs")
      .find(".movie-ratings")
      .html(),
    title: $(this)
      .closest(".movie-divs")
      .find(".movie-titles")
      .html(),
    release: $(this)
      .closest(".movie-divs")
      .find(".release-dates")
      .text()
  };

  localStorage.setItem("movieCard", JSON.stringify(movieCard));
  console.log(localStorage.getItem("movieCard"));
  $(".addToFavMovie").css("visibility", "hidden");
});

if (localStorage.getItem("movieCard") !== null) {
  addedMovieCard = JSON.parse(localStorage.getItem("movieCard"));
  console.log(addedMovieCard);
  var templateCardMovie = $("#templateMovie");
  renderMovieCard(templateCardMovie);
}

function renderMovieCard(template) {
  var removeButton = $("<button>X</button>");
  removeButton.attr("id", "clearFavCard");
  template.find("a:first").attr("href", addedMovieCard.link);
  template.find("img:first").attr("src", addedMovieCard.poster);
  template.find(".movie-ratings").html(addedMovieCard.rate);
  template.find(".movie-titles").text(addedMovieCard.title);
  template.find(".release-dates").text(addedMovieCard.release);
  $("#favCard").append(template.html(), removeButton);
}
$("#clearFavCard").on("click", function() {
  $("#favCard").empty();
  localStorage.removeItem("movieCard");
});

// send card to a friend
database
  .ref("users")
  .orderByChild("login")
  .once("value", function(snapshot) {
    var key;

    snapshot.forEach(function(childSnapshot) {
      key = childSnapshot.key;
      var option = $("<option>" + snapshot.val()[key].login + "</option>");
      $(".friendList").append(option);
    });
  });

$("#sendInvitation").on("click", function() {
  if (
    $("option").text() === "Choose a friend" ||
    $("#time").val() === "" ||
    $("#address").val() === ""
  ) {
    swal("Please, fill in time, address and choose a friend from the list");
  } else {
    database.ref("invitations").push({
      from: localStorage.getItem("login"),
      to: $(".friendList")
        .find(":selected")
        .text(),
      time: $("#time").val(),
      address: $("#address").val(),
      movie: localStorage.getItem("movieCard")
    });
    swal("An invitation has been sent to your friend");
    $("#time").val("");
    $("#address").val("");
    $(".friendList").prop("selectedIndex", 0);
  }
});

database
  .ref("invitations")
  .orderByChild("to")
  .equalTo(localStorage.getItem("login"))
  .on("value", function(snapshot) {
    var key = Object.keys(snapshot.val());
    $("#removeInvitation").data("id", key);
    console.log(snapshot.val()[key].movie);
    var invText = $("<p>").text(
      "Hi! It is " +
        snapshot.val()[key].from +
        ". Let's meet at " +
        snapshot.val()[key].address +
        " at " +
        snapshot.val()[key].time +
        ". See you there!"
    );
    var parsedObj = JSON.parse(snapshot.val()[key].movie);
    var movieCardInv = $(".movie-divs-template");
    movieCardInv.find("a:first").attr("href", parsedObj.link);
    movieCardInv.find("img:first").attr("src", parsedObj.poster);
    movieCardInv.find(".movie-ratings").html(parsedObj.rate);
    movieCardInv.find(".movie-titles").text(parsedObj.title);
    movieCardInv.find(".release-dates").text(parsedObj.release);
    $("#invitation").append(invText, movieCardInv);
  });
$("#removeInvitation").on("click", function() {
  $("#invitation").empty();
  var id = $(this).data("id");
  database.ref("invitations/" + id).remove();
});

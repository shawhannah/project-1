// Global Variables
var zipcode;
var movieArr;
var zomatoArr;
var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
var ifCardIsIndianRed = 2; // Flag variable for designing every other Zomato card's color

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

      // AJAX Call for MovieDB API
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

      // AJAX Call for Zomato API
      var queryURL =
        "https://developers.zomato.com/api/v2.1/search?q=" +
        zipcode +
        "&apikey=b33efca80e6e3f8b5a3cfaf40c6ad1f4";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        foodArr = response.restaurants;
        showFood(foodArr);
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

// Function for getting MovieDb API Data
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
      .text("Availability");
    movieAvailabilityLink.append(movieAvailability);

    var addFavButton = $("<i>").addClass("addToFavMovie far fa-plus-square");

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

// Function for getting Zomato API Data
function showFood(array) {
  zomatoDiv.empty();

  for (let i in array) {
    var zomatoInnerDiv = $("<div>").addClass("restaurant-divs");
    var parentCard = $("<div>").addClass("parent-card");
    var flipCard = $("<div>").addClass("flip-card");
    var frontCard = $("<div>").addClass("front-card");
    var backCard = $("<div>").addClass("back-card");

    // Refer to Global Variables at the top
    if (ifCardIsIndianRed % 2 === 0) {
      frontCard.css("background", "indianred");
    } else {
      frontCard.css("background", "slategray");
    }

    // Front Card - Zomato API Info
    var foodPic = $("<i>").addClass("fas fa-utensils");

    var foodRatingDiv = $("<div>").addClass("restaurant-ratings");
    var foodRating = Math.round(
      parseInt(array[i].restaurant.user_rating.aggregate_rating)
    );

    switch (foodRating) {
      case 0:
        foodRatingDiv.append(
          $("<p>")
            .addClass("no-food-ratings")
            .text("No Reviews")
        );
        break;
      case 1:
        foodRatingDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 2:
        foodRatingDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 3:
        foodRatingDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("far fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 4:
        foodRatingDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("far fa-star")
        );
        break;
      case 5:
        foodRatingDiv.append(
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star"),
          $("<i>").addClass("fas fa-star")
        );
    }

    var foodPlace = $("<p>")
      .addClass("restaurant-names")
      .text(array[i].restaurant.name);

    var foodLink = $("<a>").attr({
      href: array[i].restaurant.url,
      target: "_blank"
    });
    var foodInfo = $("<p>")
      .addClass("more-info")
      .text("More Info");
    foodLink.append(foodInfo);

    var addFavButton = $("<i>").addClass(
      "addToFavRestaurant far fa-plus-square"
    );

    // Back Card - Google Maps API Info
    var latitude = array[i].restaurant.location.latitude;
    var longitude = array[i].restaurant.location.longitude;
    var mapURL =
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      latitude +
      "," +
      longitude +
      "&zoom=16&scale=1&size=250x365&key=AIzaSyBxRCuURpipFqMG-FIb6tBy-UOa6Uvb2kw";

    var mapImage = $("<img>").attr({
      src: mapURL,
      alt: "Google Map Display of " + array[i].restaurant.name,
      class: "map-formatting"
    });
    var mapLink = $("<a>").attr({
      href:
        "https://www.google.com/maps/search/?api=1&query=" +
        array[i].restaurant.location.address,
      target: "_blank"
    });
    var mapsMarker = $("<img>").attr({
      src: "assets/images/restaurantmarker.png",
      alt: "Restaurant Finder Icon",
      class: "maps-marker"
    });
    mapLink.append(mapsMarker);

    var mapsAddress = $("<p>")
      .addClass("maps-address")
      .text(array[i].restaurant.location.address);

    // Card Appends
    frontCard.append(foodPic, foodRatingDiv, foodPlace);
    backCard.append(mapImage, mapLink, mapsAddress);
    flipCard.append(frontCard, backCard);
    parentCard.append(flipCard);
    zomatoInnerDiv.append(parentCard, foodLink, addFavButton);
    zomatoDiv.append(zomatoInnerDiv);

    ifCardIsIndianRed++;
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
          Swal({
            text: "Sorry, this username has already been taken."
          });
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
    Swal({
      type: "error",
      title: "Oops...",
      text: "A username and password is required for registration."
    });
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
        Swal({
          type: "error",
          title: "Oops...",
          text:
            "An error has occured while attempting to log in. Please try again.",
          footer: "<a href='assets/html/faq.html'>Why do I have this issue?</a>"
        });
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
          Swal({
            text: "Password is incorrect."
          });
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

// Adding Movie Card To User's Account
var addedMovieCard;

$(document).on("click", ".addToFavMovie", function() {
  Swal({
    position: "top-end",
    type: "success",
    title: "Your movie has been saved.",
    showConfirmButton: false,
    timer: 1500
  });

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
  Swal({
    text: "Your plans have been cancelled."
  });
  localStorage.removeItem("movieCard");
});

// Sending Movie Plans To Another User
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
    $("#time")
      .val()
      .trim() === "" ||
    $("#address")
      .val()
      .trim() === ""
  ) {
    Swal({
      text: "Please fill in all of the required fields."
    });
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
    Swal({
      type: "success",
      text: "An invitation has been sent to your friend"
    });
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
  Swal({
    text: "Your invitation has been deleted."
  });
  var id = $(this).data("id");
  database.ref("invitations/" + id).remove();
});

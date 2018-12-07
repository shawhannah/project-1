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

// Submit Button with Zip Code Validation
submitButton.on("click", function(e) {
  e.preventDefault();
  if (!isValidZip.test(userInput.val().trim())) {
    searchDiv.append(errorMessage.slideDown());
  } else {
    errorMessage.slideUp();
    errorMessage.css("margin-left", "103px");
    zipcode = userInput.val().trim();
    userInput.val("");
    console.log("var zipcode = " + zipcode);

    formatWebpage();

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
});

// This function reformats landing page
function formatWebpage() {
  movieDiv.css("display", "grid");
  zomatoDiv.css("display", "grid");
  $("#search-div").css("grid-row", "2 / span 1");
  $("#main-grid").css("min-height", "calc(100vh - 80px)");
  $("#cinegrub-intro").css("display", "none");
  $("#cinegrub-logo").css("display", "initial");
  $("#cinegrub-intro-logo").css("display", "none");
  $("footer").css("display", "flex");
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

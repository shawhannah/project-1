var userInput = "27540"; //$("#userInput");
var movieArr;
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

function showMovies(array) {
  for (let i in array) {
    var img = $("<img>").attr({
      src: "https://image.tmdb.org/t/p/w200/" + array[i].poster_path
    });
    var movieLink = $("<a>").attr({
      href:
        "https://www.fandango.com/fantastic-beasts-the-crimes-of-grindelwald-207770/movie-overview"
    });
    movieLink.append(img);
    var title = $("<p></p>").text(array[i].title);
    var movieCard = $("<div class='movieCard'></div>");
    var checkAvailability = $("<button class='movieCheckAvail'></button>").text(
      "check availability"
    );
    var scheduleLink = $("<a>").attr({
      href:
        "https://www.fandango.com/" +
        userInput +
        "_movietimes?mode=general&q=" +
        userInput
    });
    scheduleLink.append(checkAvailability);
    movieCard.append(movieLink, title, scheduleLink);
    $(".movie").append(movieCard);
  }
}

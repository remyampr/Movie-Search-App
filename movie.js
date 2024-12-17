const inputGroup = document.getElementById("input-group");
const inputBox = document.getElementById("input-box");
const searchButton = document.getElementById("search-button");
const resultContainer = document.getElementById("result-container");
const errorMsgBox = document.getElementById("error-msg-box");
errorMsgBox.textContent = "";
//  api key from https://www.omdbapi.com/
let apikey = "ffcefe9e";

// get data from https://www.omdbapi.com/ api
async function getData(movieName) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apikey}&t=${movieName}`
    );
    console.log("Response :", response);
    const data = await response.json();
    console.log("Data: ", data);
    // Once fetch data call function to show the dtails on dom
    showMovieDetails(data);
  } catch {
    console.log("Error occured : ", error);
  }
}

//  when click on search button
function searchMovie() {
  let movieName = inputBox.value;
  console.log("Input movieName :", movieName);
  // if there is no input
  if (!movieName) {
    errorMsgBox.innerHTML = "<h4>Enter a movie name!</h4>";
    resultContainer.textContent="";
    console.log("error msg");
  }
  // if there is data entered on input box with that name call getdata to fetch api
  else {
    errorMsgBox.textContent = "";
    getData(movieName);
  }
}
function showMovieDetails(data) {
  let src = data.Poster;
  console.log(src);
  console.log("Movie name: ", data.Title);
  if (data.Title === undefined) {
    resultContainer.innerHTML = " <h1>Sorry !!! No movie found!!!</h1>";
    inputBox.value="";
    return;
  }

  //   dta contains particular movie details will add to result containeer
  resultContainer.innerHTML = `      <div class="card mb-3 " style="max-width: 900px;">
        <div class="row g-0 p-2">
          <div class="col-md-4 col-sm-12 ">
            <img src=${src} alt=${data.Title}"movie-Poster" class="movie-poster" >
          </div>
          <div class="col-md-8 movie-content">
            <div class="card-body movie-card">
              <h5 class="card-title text-center movie-title">Movie : ${data.Title}</h5>
              <p >Rating:${data.Ratings[0].Value} <br> Release Year : ${data.Year} <br> Genre : ${data.Genre} <br>Director : ${data.Director} <br>
                Actors : ${data.Actors}
                <br>
                Language : ${data.Language}
                <br>
                Country : ${data.Country}
              </p>
              <p class="card-text ms-5">Plot : ${data.Plot}</p>
              
            </div>
          </div>
        </div>
      </div>`;
      inputBox.value="";
}

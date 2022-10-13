const url_api =
  "https://api.themoviedb.org/3/discover/movie?&api_key=b3a8a79b09d774737e13a0a05bad9428";
const search_url =
  "https://api.themoviedb.org/3/search/movie?api_key=b3a8a79b09d774737e13a0a05bad9428&query=${input_value}&page=1";

const search = document.getElementById("search");
const wrapperContent = document.getElementById("movie_film");

const getMovie = async (url_api) => {
  try {
    let response = await fetch(url_api);
    if (!response.ok) {
      throw new Error("Failed");
    }
    let data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

if (!search.value) {
  getMovie(url_api + "&sort_by=popularity.desc&page=1").then((data) => {
    renderMovie(data);
  });
}

const renderMovie = (data) => {
  wrapperContent.innerHTML = ".";
  data["results"].reverse().forEach((item) => {
    let card = `  <div class="card m-4 col-lg-3">
                        <img src="https://image.tmdb.org/t/p/w500/${
                          item.backdrop_path == true
                            ? item.backdrop_path
                            : item.poster_path
                        }">
                        <div class="card-body flex-column justify-content-between">
                            <div class="row pb-3">
                                <div class="card-title text-wrap overflow-hidden col-9 h5">${
                                  item.original_title
                                }</div>
                                <div class="text-end col-3 h6">${
                                  item.vote_average
                                }</div>
                            </div>
                            <div class="row ps-2 >
                                <p class="fs-5">${item.release_date}</p>
                            </div>
                        </div>
                    </div>`;
    wrapperContent.insertAdjacentHTML("afterbegin", card);
  });
};

search.addEventListener("input", (m) => {
  wrapperContent.innerHTML = ".";
  const searchInput = m.target.value;
  if (!searchInput) {
    getMovie(url_api + "&sort_by=popularity.desc&page=1&").then(
      (data) => {
        renderMovie(data);
      }
    );
  } else {
    getMovie(search_url + `&query=${searchInput}&page=1`).then(
      (data) => {
        renderMovie(data);
      }
    );
  }
});

// Render what is in local storage -> bit hacky
const watchList = document.querySelector(".watchlist")
const introContent = document.querySelector(".intro-content")

function localStorageItems() {
  let i = 0
  let localStorageList = []

  for (let sKey; sKey = window.localStorage.key(i); i++) {
    localStorageList.push(JSON.parse(window.localStorage.getItem(sKey)));
  }

  return localStorageList
}


function render(localStorageObj) {
  const {title, poster, rating, runtime, genre, plot} = localStorageObj

  return `
  <div class="movie">
    <div class="movie-poster">
        <img src=${poster} alt="${title}">
      </div>
    
    <div class="movie-details">
        <div class="movie-details__title">
          <p>${title}</p>
          <div class="rating">
          <img src="./images/star.svg" alt="">
          <p>${rating}</p>
          </div>
      </div> <!--end title-->

      <ul class="movie-details__meta">
        <li>${runtime}</li>
        <li>${genre}</li>
        <li class="watchlist-action">
          <button id="remove-watchlist" aria-label="add to watchlist" class="remove-watchlist-btn">
            <img src="./images/remove.svg" alt="">
            Watchlist
          </button>   
        </li>
      </ul> <!--End Metadata-->

      <div class="movie-details__plot">
        <p class="movie-plot-text">${plot}</p>
      </div>
  </div> <!--End details-->
  </div>`
}

let storedItems = localStorageItems()
storedItems.map(movie => {
  watchList.innerHTML += render(movie)
  introContent.style.display = "none"
})

console.log(storedItems.length)
// Remove from watchlist
const removeBtns = document.getElementsByClassName("remove-watchlist-btn")
for(let i = 0; i < removeBtns.length; i++) {
  removeBtns[i].addEventListener('click', () => {
    storedItems[i].isSaved = false
    localStorage.removeItem(storedItems[i].imdbID)
    storedItems = localStorageItems()

    let newHtml = ""
    storedItems.map(movie => {
      newHtml += render(movie)
    })

    watchList.innerHTML = newHtml
  })
}
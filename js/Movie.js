class Movie {
  constructor(data) {
    Object.assign(this, data)
  }

  renderHtml() {
    const {title, poster, rating, runtime, genre, plot} = this

    return `<div class="movie">
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
              <button id="add-watchlist" aria-label="add to watchlist" class="add-watchlist-btn">
                <img src="./images/add.svg" alt="">
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

  addToLocalStorage() {
    localStorage.setItem(`${this.imdbID}`, JSON.stringify(this))
  }

  retriveFromLocalStorage() {
    return JSON.parse(localStorage.getItem(`${this.imdbID}`))
  }

  removeFromLocalStorage() {
    localStorage.removeItem(`${this.imdbID}`)
  }

}

export default Movie
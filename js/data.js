import Movie from "./Movie.js"

const baseURL = "http://www.omdbapi.com/?apikey=d932efde&"

const contentDisplaySection  = document.querySelector('.content-display')
const movieDisplaySection    = document.querySelector(".movie-display")

function getMovies(searchString) { 
  fetch(`${baseURL}s=${searchString}`)
    .then(res => {
      if (!res.ok) {
        throw Error("Unable to find movie")
      }
      return res.json()
    })
    .then(data =>  {
      let urlPromises = []
      data.Search.map(movie => urlPromises.push( fetch(`${baseURL}i=${movie.imdbID}`)))
      return urlPromises      
    })
    .then(promiseArr => Promise.all(promiseArr))
    .then(responses => responses.map(res => res.json()))
    .then(resp => Promise.all(resp))
    .then(data => {
      let movies = []

      // Refine Data
      data.map(movie => {
        movies.push(new Movie(extractMovieDetails(movie)))
      })

      //  Render index.html
      movies.map(movie => {
        movieDisplaySection.innerHTML += movie.renderHtml() 
      })

      // Add to watchlist
      const watchListBtns = document.getElementsByClassName('add-watchlist-btn')
      for(let i = 0; i < watchListBtns.length; i++) {
        watchListBtns[i].addEventListener('click', () => {
          movies.map(movie  => {
            if (movie.imdbID === data[i].imdbID && movie.isSaved === false) {
              movie.isSaved = true 
              movie.addToLocalStorage() 
            } 
          })   
        })}
    })

    .catch(err => {
    contentDisplaySection.innerHTML = `
        <p class = "content-display__text">
          Unable to find what you're looking for. Please try another search.
        </p>
     `
     console.log(`${err}`)
     })
 } 

function  extractMovieDetails(data) {
  return {
        title: data.Title, 
        poster: data.Poster, 
        rating:data.Ratings[0].Value, 
        runtime: data.Runtime, 
        genre: data.Genre, 
        plot: data.Plot,
        imdbID: data.imdbID,
        isSaved: false
    }

}

export { getMovies } 


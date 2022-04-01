// Only retrive data
import Movie from "./Movie.js"

const baseURL = "http://www.omdbapi.com/?apikey=d932efde&"

const contentDisplaySection  = document.querySelector('.content-display')
let movies = [] 

function getMovies(searchString) { 
  fetch(`${baseURL}s=${searchString}`)
    .then(res => {
      if (!res.ok) {
        throw Error("Unable to find movie")
      }
      return res.json()
    })
    .then(data =>  {
      getMovieDetails(data.Search)
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

 function  getMovieDetails(movieArray) {
   movieArray.map(movie => {
    fetch(`${baseURL}i=${movie.imdbID}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      const movieData = {
        title: data.Title, 
        poster: data.Poster, 
        rating:data.Rating, 
        runtime: data.Runtime, 
        genre: data.Genre, 
        plot: data.Plot,
        imdbID: data.imdbID
    }
    let movie = new Movie(movieData)
    movies.push(movie) 
    
    // document.querySelector(".movie-display").innerHTML += movie.renderHtml()
   })
  })
}

export { getMovies } 


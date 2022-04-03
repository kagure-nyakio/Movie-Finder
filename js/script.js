import { getMovies } from "./data.js"


const contentDisplaySection  = document.querySelector('.content-display')
const movieDisplaySection    = document.querySelector(".movie-display")

const searchFormEl           = document.querySelector('.search-form')
const searchMovieInput       = document.querySelector('#search-movie')
const watchListSection       = document.querySelector(".watchlist")


// Render to index html
searchFormEl.addEventListener('submit', (event) => {
  event.preventDefault()

  if (searchMovieInput.value === "") {
    alert("Your search is empty")
  } 
  getMovies(searchMovieInput.value)
  movieDisplaySection.style.display   = "block"
  contentDisplaySection.style.display = 'none'

  searchFormEl.reset()
  console.log(watchListSection)

})

// Clear DOM when user starts typing
searchMovieInput.addEventListener('input' , () => {
  movieDisplaySection.innerHTML = ""
  movieDisplaySection.style.display = "none"
  contentDisplaySection.style.display = 'block'
})

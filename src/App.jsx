import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAuthentication } from './TMDB/TMDBAuth.jsx'
import js from '@eslint/js'

async function authtest() {
  const data = await getAuthentication();
  console.log(data);
}

function App() {

  const [movies, setMovies] = useState([])

  const fetchData = async (query) => {
    if (!query) return setMovies([])

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_2}`,
          "Content-type": "application/json;charset=utf-8"
        }
      }
    )
    const movieData = await res.json()
    setMovies(movieData.results || [])
  }

  return (
    <>
      <div>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={(authtest)}>
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

        <div>
          <input onChange={(e) => fetchData(e.target.value)}/>

          <div>{movies.map(movie => (
            <div key={movie.id}>
              <img src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/150?text=No+Image"
              } 
                  alt={movie.title} 
              />
              <p>{movie.title}</p>
            </div>
          ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default App

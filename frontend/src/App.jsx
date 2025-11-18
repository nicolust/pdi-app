import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAuthentication } from './TMDB/TMDBAuth.jsx'
import { collection, doc, query, setDoc } from 'firebase/firestore'
import { MOVIES_REF, db } from '../firebase/config.jsx'
import js from '@eslint/js'
import firebase from 'firebase/compat/app'

async function authtest() {
  const data = await getAuthentication();
  console.log(data);
}



function App() {

  const [movie, setMovie] = useState('')
  const [movieList, setMovieList] = ('')


  // Haetaan data

  const fetchData = getAuthentication()

// Lisätään tekstikentän sisältö fribaseen
  const addMovie = () => {
    const docData = {
    stringExample: {movie}
};

    setDoc(doc(db, "Favourites", "movie2"), docData);
  }



  return(
    <>
      <div>
        <input type="text" 
        value={movie} 
        onChange={(e) => setMovie(e.target.value)} />

        <button onClick={addMovie()}>Add new movie</button>
      </div>
    </>
  )
}



/*function App() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const [movieList, setMovieList] = useState([])

  const [movie, setMovie] = useState('')

async function sendMessage(userInput) {
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }), // send a single message
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    setResponse(data.reply);
  } catch (err) {
    console.error(err);
    setResponse("Oops, something went wrong.");
  }
}


  const addMovie = () => {
    const docData = {
    stringExample: {movie}
};

    setDoc(doc(db, "Favourites", "movie2"), docData);
  }


  const fetchData = async (query) => {
    if (!query) return setMovieList([])

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
    setMovieList(movieData.results || [])

    
  console.log(res)

  }

  return (
    <>
        <div className="card">
          <button onClick={(authtest)}>
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        

        <div>
          <input onChange={(e) => fetchData(e.target.value)}/>

          <div>{movieList.map(movie => (
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

        <div>
        <input type="text" 
        value={movie} 
        onChange={(e) => setMovie(e.target.value)} />

        <button onClick={addMovie()}>Add new movie</button>
        </div>
        
        <div style={{ padding: 20 }}>
        <h1>Chat with AI</h1>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
        />
        <br />
        <button onClick={() => sendMessage(message)}>Send</button>

        <p>
          <strong>Response:</strong>{" "}
          {response ? response.content : "No response yet"}
        </p>
      </div>
    </>
    
  )
}*/

export default App


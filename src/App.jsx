import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAuthentication } from './TMDB/TMDBAuth.jsx'
import { collection, doc, setDoc } from 'firebase/firestore'
import { MOVIES_REF, db } from '../firebase/config.jsx'
import js from '@eslint/js'
import firebase from 'firebase/compat/app'

async function authtest() {
  const data = await getAuthentication();
  console.log(data);
}

function App() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

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

      </div>
    </>
    
  )
}

export default App
import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])

  const handleSearch = (e) => {
    if (e.key === 'Enter'){
      var title = e.target.value;

      const exec = async() => {
        const response = await fetch('http://www.omdbapi.com/?s=' + encodeURI(title) + '&apikey=57b9a176');
        const json = await response.json();

        var movies = json.Search;

        setMovies(movies);
      };
      exec();
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="Container-Header"> 
        <FaStar className="Header-Icon" color="yellow" size={25} />   
        <h1>API - OMDb</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input 
            type="text" 
            placeholder="Título do Filme..." 
            onKeyDown={(e) => handleSearch(e)}
          />
        </form>
      </div>
      <div className="Container-Content">
        <ul>
          {
            movies.map(movie => {
              return (
                <li>                  
                  <img src={movie.Poster} />
                  <br/>
                  <span className="Movie-Title">{movie.Title}</span>
                  <br/>
                  <span>{movie.Year}</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    </>
  );
}

export default App;

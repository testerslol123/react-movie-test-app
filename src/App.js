import React, { useState } from 'react';
import './App.css';

import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const apiUrl = 'http://www.omdbapi.com/?apikey=56e6294';

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiUrl + "&s="+state.s).then(({data}) => {
        console.log(data);
        if (data.Response === "False") {
          setState(prevState => {
            return { ...prevState, results: []}
          });
        } else {
          let results = data.Search;
          setState(prevState => {
            return { ...prevState, results: results}
          });
        }
      })
    }
  }


  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return {
        ...prevState, s: s
      }
    });
    console.log(state.s);
  }

  const openPopup = id => {
    axios(apiUrl + "&i=" + id).then(({data}) => {
      let result = data;
      setState(prevState => {
        return {...prevState, selected: result}
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected: {}}
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE DATABASE</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        
        
        <Results results={state.results} openPopup={openPopup} />
        
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false }

      </main>
    </div>
  );
}

export default App;

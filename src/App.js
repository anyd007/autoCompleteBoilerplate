import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Autocomplite from "./autocomplite/Autocomplite"

const App = () => {
  return (
    <Router>
    <div className="App"> </div>
    <div className="content">
      <Routes>
        <Route exact path="/" element={<Autocomplite />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

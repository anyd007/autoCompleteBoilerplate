import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Autocomplite from "./autocomplite/Autocomplite";
import UserDetals from "./userDetals/UserDetals";
import { ThemeProvider } from "./bgContext/BgContext";

const App = () => {
  const [value, setValue] = useState([]);
  return (
    <Router>
      <div className="App">
        <ThemeProvider>
          <Routes>
            <Route exact path="/" element={<Autocomplite setValue={setValue} />}/>
            <Route path="/userDetals" element={<UserDetals value={value} />} />
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;

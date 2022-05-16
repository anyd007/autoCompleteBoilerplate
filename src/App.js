import React from 'react';
import Autocomplite from "./autocomplite/Autocomplite"
import UserDetals from "./userDetals/UserDetals"

const App = () => {
  const [value, setValue] = React.useState([])
  const [showDetals, setShowdetals] = React.useState(false)
  React.useEffect(()=>{
    value.length ===1 ? setShowdetals(true) : setShowdetals(false)
  },[value])

  return (
    <div className="App">
      <Autocomplite setValue={setValue}/>
     {showDetals && <UserDetals value={value}/>}
    </div>

  );
}

export default App;

import React, { useState, createContext, useContext } from "react";
const themes = {
  dark: {
    placeholder:{
    color:"#F8D800",
    },
    fontFamily: "'Oswald', sans-serif",
    color: "#F8D800",
    background: "linear-gradient(to right, #000000, #434343)", //zapożyczone z https://cssgradient.io/
  },
  light: {
    fontFamily: "'Oswald', sans-serif",
    color: "#0D25B9",
    background: "linear-gradient(to right, #ffefba, #ffffff)", //zapożyczone z https://cssgradient.io/
  },
};

const ThemeContext = createContext();


export const useTheme = () =>{
   return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes);
 
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
 
      {children}
    
    </ThemeContext.Provider>
  );
};

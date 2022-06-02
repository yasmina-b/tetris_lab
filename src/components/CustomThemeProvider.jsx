import React from 'react'
import { blue, pink } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from 'react';

export const ThemeContext  = React.createContext({x:5});

const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: blue[200],
      },
      secondary: {
        main: pink[200],
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: blue[900],
      },
      secondary: {
        main: pink[700],
      },
    },
  });

 
export default function CustomThemeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);
    return(
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
             <ThemeContext.Provider value={{darkMode,setDarkMode}}>{children}</ThemeContext.Provider>
        </ThemeProvider>
    );
}

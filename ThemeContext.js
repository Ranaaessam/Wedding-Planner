// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

const themes = {
  light: {
    background: "#f0f0f0",
    text: "#333",
    card: "#fff",
    extra: "#FF81ae",
  },
  dark: {
    background: "#121212",
    text: "#ffffff",
    card: "#1e1e1e",
    extra: "#4C134E",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(themes[colorScheme] || themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  useEffect(() => {
    setTheme(themes[colorScheme]);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export { themes };

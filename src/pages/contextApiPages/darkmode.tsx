import React, { useContext } from "react";
import { Button, Typography, Box } from "@mui/material";
import { ThemeContext } from "@emotion/react";


interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const DarkMode: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <Box
      sx={{
        bgcolor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">{theme}</Typography>
      <Button variant="contained" onClick={toggleTheme}>
        Change Theme
      </Button>
    </Box>
  );
};

export default DarkMode;

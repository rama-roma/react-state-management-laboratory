import { Link, Outlet } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./state/contextApi/darkMode";

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        bgcolor: theme === "light" ? "#fff" : "#121212",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
        transition: "all 0.3s",
      }}
    >
      <header className="max-w-[1300px] m-auto p-4">
        <nav className="flex items-center justify-center gap-[10px]">
          <Link to="/redux">
            <Button variant="contained">Redux</Button>
          </Link>
          <Link to="/zustand">
            <Button variant="contained">Zustand</Button>
          </Link>
          <Link to="/jotai">
            <Button variant="contained">Jotai</Button>
          </Link>
          <Link to="/mobX">
            <Button variant="contained">MobX</Button>
          </Link>
          <Link to="/contextApi">
            <Button variant="contained">Context API</Button>
          </Link>
          <Link to="/queryReact">
            <Button variant="contained">React Query</Button>
          </Link>

          <Button
            onClick={toggleTheme}
            variant="outlined"
            sx={{ marginLeft: 2 }}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </nav>
      </header>

      <main className="max-w-[1300px] m-auto p-4">
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;

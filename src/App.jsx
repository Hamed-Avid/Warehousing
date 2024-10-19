import { DarkModeSwitch } from "react-toggle-dark-mode";
import UseTheme from "./hooks/UseTheme";

export default function App() {
  const [theme, setTheme] = UseTheme();
  const themeOptions = ["light", "dark", "green"];

  return (
    <div className="bg-bkg w-screen h-screen content-center flex justify-evenly transition-all duration-500 ease-out">
      {themeOptions.map((theme) => (
        <button key={theme} onClick={() => setTheme(theme)}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
        </button>
      ))}
      <DarkModeSwitch
        checked={theme === "light"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        size={30}
      />
    </div>
  );
}

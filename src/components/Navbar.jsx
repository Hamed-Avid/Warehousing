import { useNavigate } from "react-router-dom";
import UseTheme from "../hooks/UseTheme";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Navbar() {
  const [theme, setTheme] = UseTheme();
  const navigate = useNavigate();

  return (
    <header className="bg-frg px-4 py-3 md:p-5 rounded-md">
      <nav className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-center gap-3">
        <img
          src="/images/Avid-logo.png"
          alt="Avid logo"
          className="col-start-2 size-10 cursor-pointer place-self-center"
          onClick={() => navigate("/")}
        />

        <div className="flex justify-end">
          <DarkModeSwitch
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            size={30}
          />
        </div>
      </nav>
    </header>
  );
}

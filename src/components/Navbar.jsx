import UseTheme from "../hooks/UseTheme";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Navbar() {
  const [theme, setTheme] = UseTheme();

  return (
    <header className="bg-frg p-3 md:p-4">
      <nav className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-center gap-3">
        <img
          src="/images/Avid-logo.png"
          alt="Avid logo"
          className="col-start-2 size-10 place-self-center"
        />

        <div className="flex justify-end">
          <DarkModeSwitch
            checked={theme === "light"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            size={30}
          />
        </div>
      </nav>
    </header>
  );
}

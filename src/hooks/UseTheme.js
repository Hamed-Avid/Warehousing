import { useEffect, useState, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useTheme() {
  const [localTheme, setLocalTheme] = useLocalStorage("theme", "dark");
  const [theme, setTheme] = useState(localTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    setLocalTheme(theme);
  }, [theme, setLocalTheme]);

  const setCustomTheme = useMemo(() => (newTheme) => setTheme(newTheme), []);

  return [theme, setCustomTheme];
}

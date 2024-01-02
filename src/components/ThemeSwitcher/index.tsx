import { useTheme } from "next-themes";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function ThemeSwithcer() {
  const { theme, setTheme } = useTheme();

  function handleThemeToggle(): void {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <button
      className="text-2xl dark:text-white-50"
      onClick={(): void => handleThemeToggle()}
    >
      {theme === "light" && <MdDarkMode />}
      {theme === "dark" && <MdOutlineLightMode />}
    </button>
  );
}

export default ThemeSwithcer;

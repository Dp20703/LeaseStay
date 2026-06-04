import { Moon, Sun } from "@/constants/icons";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggle = ({ darkMode, setDarkMode }: ThemeToggleProps) => {
  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="
        h-10 w-10 rounded-full
        border border-border-light
        dark:border-border-dark
        flex items-center justify-center
        hover:scale-105
        transition-all
      "
    >
      {darkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;

import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 left-4 z-50 p-2 rounded-full bg-muted text-muted-foreground shadow-md hover:shadow-lg transition"
      aria-label="Toggle Theme"
      title="تبديل الوضع الليلي"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;

import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="font-bold border-b border-gray-300 h-[10vh]">
      <div className="container mx-auto flex justify-between items-center h-full p-4">
        <div>
          <a href="/">
            <h1 className="text-xl sm:text-2xl md:text-3xl">TO-DO LIST</h1>
          </a>
        </div>
        <nav className="flex gap-5 items-center text-sm sm:text-lg md:text-xl">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center p-1 sm:p-2 md:p-3 rounded-full ${
              isDarkMode ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
export default Header;

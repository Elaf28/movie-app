import { HiSun, HiMoon } from "react-icons/hi";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") !== "light"
    );

    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-3xl md:text-4xl hover:text-primary transition cursor-pointer bg-card/50 backdrop-blur-md p-2 rounded-full shadow-md"
        >
        {darkMode ? (
            <HiSun className="hover:text-yellow-500" />
        ) : (
            <HiMoon />
        )}
        </button>
    );
};

export default ThemeToggle;
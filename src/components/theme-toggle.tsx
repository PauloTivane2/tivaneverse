"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="rounded-md p-2 transition-colors hover:bg-light-secondary dark:bg-dark-secondary text-light-foreground dark:text-dark-foreground border border-light-foreground/10 dark:border-dark-foreground/10 flex items-center justify-center cursor-pointer"
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

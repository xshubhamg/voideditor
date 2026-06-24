"use client";

import { Monitor, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center border border-border text-foreground hover:bg-muted bg-transparent focus:outline-none transition-colors"
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4 shrink-0" />
      </button>
    );
  }

  // Cycle: system -> light -> dark -> system
  const toggleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getIcon = () => {
    if (theme === "light") {
      return <Sun className="h-4 w-4 shrink-0" weight="bold" />;
    }
    if (theme === "dark") {
      return <Moon className="h-4 w-4 shrink-0" weight="bold" />;
    }
    return <Monitor className="h-4 w-4 shrink-0" weight="bold" />;
  };

  const getLabel = () => {
    if (theme === "light") return "Light Theme";
    if (theme === "dark") return "Dark Theme";
    return "System Theme";
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center border border-border text-foreground hover:bg-muted bg-transparent focus:outline-none transition-colors"
      aria-label="Toggle theme"
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}

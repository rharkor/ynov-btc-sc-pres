// app/components/ThemeSwitcher.tsx
"use client";

import { cn } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "h-auto w-auto",
          "bg-transparent",
          "rounded-lg",
          "flex items-center justify-center",
          "group-data-[selected=true]:bg-transparent",
          "!text-default-500",
          "pt-px",
          "px-0",
          "mx-0",
          "absolute right-4 top-4"
        )}
      >
        {theme === "dark" ? <Sun size={26} /> : <Moon size={26} />}
      </button>
    </div>
  );
}

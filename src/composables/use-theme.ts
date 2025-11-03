import type { Theme } from "@/types/theme";
import { ref } from "vue";

export function useTheme() {
  const theme = ref<Theme>((localStorage.getItem("theme") as Theme) || "light");

  if (theme.value != "light" && theme.value != "dark") {
    applyTheme("light");
  }

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  if (!localStorage.getItem("theme")) {
    if (systemPrefersDark.matches) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }

  function applyTheme(value: Theme) {
    if (value != "light" && value != "dark") {
      console.warn("Передано неверное значение цветовой темы");
      return;
    }
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
    theme.value = value;
  }

  return {
    theme,
    applyTheme,
  };
}

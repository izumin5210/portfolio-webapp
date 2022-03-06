import { css } from "@linaria/core";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { colors } from "../styles/colors";

const localStorageKey = "theme";

export function LoadThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  try {
    var theme = localStorage.getItem("${localStorageKey}");
    if (theme != null) {
      document.body.classList.add(theme + "-mode");
    }
  } catch (_e) { }
})();
    `,
      }}
    />
  );
}

export function useTheme(): {
  className: string;
  theme: "dark" | "light" | undefined;
  setTheme: Dispatch<SetStateAction<"dark" | "light" | undefined>>;
} {
  const [themeName, setThemeName] = useState<"dark" | "light" | undefined>();
  // initialize themeName
  useEffect(() => {
    const persistedThemeName = window.localStorage.getItem(localStorageKey);
    if (persistedThemeName === "dark" || persistedThemeName === "light") {
      setThemeName(persistedThemeName);
    } else {
      const isDefaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeName(isDefaultDark ? "dark" : "light");
    }
  }, []);

  const themeRef = useRef(themeName);
  useEffect(() => {
    if (themeName == null) return;
    const prev = themeRef.current;
    themeRef.current = themeName;

    if (prev === themeName) return;

    if (prev != null) {
      document.body.classList.remove(`${prev}-mode`);
    }
    if (!document.body.classList.contains(`${themeName}-mode`)) {
      document.body.classList.add(`${themeName}-mode`);
    }
    if (prev == null) return;

    window.localStorage.setItem(localStorageKey, themeName);
  }, [themeName]);

  return {
    className: themeName == null ? themeCss : [themeCss].join(" "),
    theme: themeName,
    setTheme: setThemeName,
  };
}

const themeCss = css`
  :global() {
    @media (prefers-color-scheme: light) {
      :root {
        ${transformKeys(colors.light, (k) => `--${k}`)}
      }
    }
    @media (prefers-color-scheme: dark) {
      :root {
        ${transformKeys(colors.dark, (k) => `--${k}`)}
      }
    }
    body {
      &.dark-mode {
        ${transformKeys(colors.dark, (k) => `--${k}`)}
      }

      &.light-mode {
        ${transformKeys(colors.light, (k) => `--${k}`)}
      }
    }
  }
`;

function transformKeys<T extends Record<string, unknown>>(obj: T, fn: (key: string) => string) {
  return Object.keys(obj).reduce((newObj, key) => ({ ...newObj, [fn(key)]: obj[key] }), {});
}

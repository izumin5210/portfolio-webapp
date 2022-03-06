import { css } from "@linaria/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { colors } from "../styles/colors";

export function useTheme(): {
  className: string;
  theme: "dark" | "light" | undefined;
  setTheme: Dispatch<SetStateAction<"dark" | "light" | undefined>>;
} {
  const [themeName, setThemeName] = useState<"dark" | "light" | undefined>();
  useEffect(() => {
    const isDefaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDefaultDark) setThemeName("dark");
  }, []);

  return {
    className: themeName == null ? themeCss : [themeCss, `${themeName}-mode`].join(" "),
    theme: themeName,
    setTheme: setThemeName,
  };
}

const themeCss = css`
  :global() {
    :root {
      ${transformKeys(colors.light, (k) => `--${k}`)}
    }
    @media (prefers-color-scheme: dark) {
      :root {
        ${transformKeys(colors.dark, (k) => `--${k}`)}
      }
    }
  }

  &.dark-mode {
    ${transformKeys(colors.dark, (k) => `--${k}`)}
  }

  &.light-mode {
    ${transformKeys(colors.light, (k) => `--${k}`)}
  }
`;

function transformKeys<T extends Record<string, unknown>>(obj: T, fn: (key: string) => string) {
  return Object.keys(obj).reduce((newObj, key) => ({ ...newObj, [fn(key)]: obj[key] }), {});
}

import { useDarkMode } from "storybook-dark-mode";
import "sanitize.css";
import { useTheme } from "../src/lib/ui/useTheme";
import { useEffect } from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

function ThemeWrapper(props) {
  const isDarkMode = useDarkMode();
  const { className, setTheme } = useTheme();
  useEffect(() => {
    setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode, setTheme]);
  return <div className={className}>{props.children}</div>;
}

/** @type {import("@storybook/react").DecoratorFn[]} */
export const decorators = [(renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];

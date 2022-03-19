import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useCallback } from "react";
import "sanitize.css";
import { RoutingProgress } from "./lib/RoutingProgress";
import { colors } from "./lib/styles/colors";
import { body1, caption, heading5 } from "./lib/styles/typo";
import { textLinkCss } from "./lib/ui/TextLink";
import { useTheme } from "./lib/ui/useTheme";

export function Layout(props: { children: ReactNode }) {
  const { className: themeCssClass, theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }, [setTheme]);

  return (
    <Outer className={themeCssClass}>
      <RoutingProgress />
      <Main>
        {theme != null && (
          <IconButton onClick={toggleTheme}>{theme === "light" ? <MoonIcon /> : <SunIcon />}</IconButton>
        )}
        <Header>
          <AvatarWrapper>
            <Image src="/izumin.png" alt="izumin521t0" width={80} height={80} quality={100} layout="fixed" />
          </AvatarWrapper>
          <InfoWrapper>
            <NameHeading>
              <Link href="/" passHref>
                <a>izum.in</a>
              </Link>
            </NameHeading>
            <ShortDescription>
              <Link href="https://github.com/izumin5210" passHref>
                @izumin5210
              </Link>{" "}
              - Software Engineer
            </ShortDescription>
          </InfoWrapper>
        </Header>
        {props.children}
        <Footer>
          &copy; 2022{" "}
          <a href="https://github.com/izumin5210" rel="noopener noreferrer" target="_blank">
            izumin5210
          </a>
          <br />
          This site uses{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Analytics
          </a>
          .
          <br />
          built at {process.env.BUILT_AT}{" "}
          <a
            href={`https://github.com/izumin5210/portfolio-webapp/commit/${process.env.GIT_SHA}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {process.env.GIT_SHA}
          </a>
        </Footer>
      </Main>
    </Outer>
  );
}

const Outer = styled.div`
  transition: background 300ms;
  background: var(--background);
  min-height: 100vh;
`;

const Main = styled.main`
  position: relative;
  margin: 0 auto;
  max-width: 960px;
`;

const Header = styled.header`
  margin: 0;
  padding: 84px 0 32px;
  display: grid;
  grid-template-areas: "avatar info";
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const InfoWrapper = styled.div`
  grid-area: info;
`;

const NameHeading = styled.h1`
  ${heading5}
  font-weight: 400;
  margin: 0;
  padding: 0;

  a {
    color: var(--text);
    text-decoration: none;
  }
`;

const ShortDescription = styled.p`
  ${body1}
  font-weight: 400;
  color: var(--textLowEmphasis);
  margin: 0;
  padding: 0;

  a {
    color: var(--text);
    text-decoration: none;
  }
`;

const AvatarWrapper = styled.div`
  grid-area: avatar;
  border-radius: 9999vh;
  background: ${colors.white.hex};
  // elevation 1
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`;

const Footer = styled.footer`
  margin-top: 96px;
  padding: 8px;
  ${caption}
  color: var(--textLowEmphasis);
  text-align: center;

  & a {
    ${textLinkCss("var(--text)")}
  }
`;

interface IconButtonProps<Comp extends React.ElementType> {
  children: ReactNode;
  onClick: () => void;
  as?: Comp;
}

function IconButton<Comp extends React.ElementType>(props: IconButtonProps<Comp>) {
  const Component = props.as || "button";
  return (
    <Component className={iconButtonCss} onClick={props.onClick}>
      {props.children}
    </Component>
  );
}

const iconButtonCss = css`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 9999vh;
  background: var(--text);
  padding: 4px;
  & svg {
    width: 24px;
    height: 24px;
    color: var(--background);
  }
`;

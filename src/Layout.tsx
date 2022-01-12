import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Image from "next/image";
import { ReactNode } from "react";
import "sanitize.css";
import { colors } from "./lib/styles/colors";
import { body1, caption, heading5 } from "./lib/styles/typo";

export function Layout(props: { children: ReactNode }) {
  return (
    <Main>
      <EnvRibbon />
      <Header>
        <AvatarWrapper>
          <Image src="/izumin.png" alt="izumin521t0" width={80} height={80} quality={100} layout="fixed" />
        </AvatarWrapper>
        <InfoWrapper>
          <NameHeading>@izumin5210</NameHeading>
          <ShortDescription>Software Engineer</ShortDescription>
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
  );
}

const Main = styled.main`
  margin: 0 auto;
  max-width: 960px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 84px 0 32px;
  margin: 0;
`;

const InfoWrapper = styled.div`
  margin-left: 16px;
`;

const NameHeading = styled.h1`
  ${heading5}
  font-weight: 400;
  color: ${colors.text};
  margin: 0;
  padding: 0;
`;

const ShortDescription = styled.p`
  ${body1}
  font-weight: 400;
  color: ${colors.text};
  margin: 0;
  padding: 0;
`;

const AvatarWrapper = styled.div`
  grid-area: avatar;
  border-radius: 9999vh;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`;

const Footer = styled.footer`
  padding: 8px;
  ${caption}
  color: ${colors.textLowEmphasis};
  text-align: center;

  & a {
    &:focus-visible {
      outline: 2px solid ${colors.blue700};
    }
    &:focus:not(:focus-visible) {
      outline: 0;
    }
    position: relative;
    &:before {
      position: absolute;
      bottom: 1px;
      content: "";
      width: 100%;
      transition: all 300ms;
      border-bottom: 1px solid ${colors.textLowEmphasis};
    }
    &:hover,
    &:active {
      &:before {
        border-bottom: 1px solid transparent;
      }
    }
    border-radius: 4px;
    color: ${colors.text};
    text-decoration: none;
    transition: background 300ms;
  }
`;

function EnvRibbon() {
  // FIXME: stop using NODE_ENV
  if (process.env.NODE_ENV === "production") return null;
  return <div className={ribbonCss}>{process.env.NODE_ENV}</div>;
}

const ribbonCss = css`
  position: fixed;
  overflow: hidden;
  top: 16px;
  right: -24px;
  z-index: 10000;
  ${caption};
  width: 108px;
  height: 24px;
  line-height: 24px;
  color: ${colors.textLight};
  transform: rotate(45deg);
  text-align: center;
  background-color: ${colors.gray600};
`;

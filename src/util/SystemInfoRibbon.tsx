import { css } from "@linaria/core";
import clsx from "clsx";
import { colors } from "../lib/styles/colors";
import { subtitle1 } from "../lib/styles/typo";

type Props = { build: NodeJS.ProcessEnv["NODE_ENV"]; previewedPrNum: number | null };

export function SystemInfoRibbon(props: Props) {
  if (props.build === "development") {
    return <div className={clsx([ribbonCss, ribbonCssDev])}>{props.build}</div>;
  }
  if (props.previewedPrNum != null) {
    return (
      <a
        href={`https://github.com/izumin5210/portfolio-webapp/pull/${props.previewedPrNum}`}
        className={clsx([ribbonCss, ribbonCssPreview])}
        target="_blank"
        rel="noreferrer noopener"
      >
        PR #{props.previewedPrNum}
      </a>
    );
  }
  return null;
}

const ribbonCss = css`
  position: fixed;
  overflow: hidden;
  top: 28px;
  right: -36px;
  z-index: 10000;
  ${subtitle1};
  width: 160px;
  height: 32px;
  line-height: 32px;
  transform: rotate(45deg);
  text-align: center;
`;

const ribbonCssDev = css`
  color: ${colors.dark.text};
  background-color: ${colors.gray600.hex};
`;

const ribbonCssPreview = css`
  color: ${colors.dark.text};
  background-color: ${colors.teal600.hex};
  text-decoration: none;
`;

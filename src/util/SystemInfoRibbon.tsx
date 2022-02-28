import clsx from "clsx";
import { css } from "@linaria/core";
import { colors } from "../lib/styles/colors";
import { caption } from "../lib/styles/typo";

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
  top: 16px;
  right: -24px;
  z-index: 10000;
  ${caption};
  width: 108px;
  height: 24px;
  line-height: 24px;
  transform: rotate(45deg);
  text-align: center;
`;

const ribbonCssDev = css`
  color: ${colors.textLight};
  background-color: ${colors.gray600};
`;

const ribbonCssPreview = css`
  color: ${colors.textLight};
  background-color: ${colors.teal600};
  text-decoration: none;
`;

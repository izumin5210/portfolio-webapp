// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const { PHASE_PRODUCTION_BUILD } = require("next/constants");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore @types/next-linaria does not exist
const withLinaria = require("next-linaria");
const { execSync } = require("child_process");

/**
 * @param {string} phase
 * @param {*} object
 * @returns {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  let nextConfig = {
    ...defaultConfig,
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    env: {
      GIT_SHA: getGitSha(phase),
      BUILT_AT: new Date().toISOString(),
    },
  };

  nextConfig = withLinaria(nextConfig);

  return nextConfig;
};

/**
 * @param {string} phase
 * @returns {String}
 */
function getGitSha(phase) {
  const sha =
    phase === PHASE_PRODUCTION_BUILD
      ? process.env.GIT_SHA
      : execSync("git describe --always --dirty").toString("utf-8").trim();

  if (sha === undefined) throw new Error("GIT_SHA is required");

  return sha.slice(0, 7);
}

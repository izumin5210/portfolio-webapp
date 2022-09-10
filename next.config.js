// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");

const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
  PHASE_DEVELOPMENT_SERVER,
  PHASE_TEST,
} = require("next/constants");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore @types/next-linaria does not exist
const withLinaria = require("next-linaria");
const { execSync } = require("child_process");
const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");

/**
 * @param {string} phase
 * @param {*} object
 * @returns {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => {
  const gitSha = getGitSha(phase);

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
      GIT_SHA: gitSha,
      BUILT_AT: new Date().toISOString(),
    },
    rewrites() {
      return [{ source: "/blog/feed", destination: "/api/blog/feed" }];
    },
    webpack(config) {
      // https://github.com/vercel/next.js/issues/17806#issuecomment-913437792
      config.module.rules.push({
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      });
      return config;
    },
    experimental: {
      outputStandalone: true,
    },
  };

  if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) {
    nextConfig = {
      ...nextConfig,
      generateBuildId: () => gitSha,
    };
  }

  nextConfig = withLinaria(nextConfig);
  nextConfig = /** @type {*} */ (withSentryConfig(/** @type {*} */ (nextConfig), { silent: true }));

  if (phase === PHASE_PRODUCTION_BUILD) {
    nextConfig = require("@next/bundle-analyzer")({ enabled: true })(nextConfig);
  }

  return nextConfig;
};

/**
 * @param {string} phase
 * @returns {String}
 */
function getGitSha(phase) {
  /** @type {string|undefined} */
  let sha;

  switch (phase) {
    case PHASE_PRODUCTION_BUILD:
      sha = process.env.GIT_SHA;
      break;
    case PHASE_PRODUCTION_SERVER:
      sha = fs.readFileSync(path.join(__dirname, ".next", "BUILD_ID"), "utf-8").trimEnd();
      break;
    case PHASE_TEST:
    case PHASE_DEVELOPMENT_SERVER:
      sha = execSync("git describe --always --dirty").toString("utf-8").trim();
      break;
  }

  if (sha === undefined) throw new Error("GIT_SHA is required");

  return sha.slice(0, 7);
}

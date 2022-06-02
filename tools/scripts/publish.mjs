/**
 * You might need to authenticate with NPM before running this script.
 */

import { readCachedProjectGraph } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';
import promptSync from 'prompt-sync';
import semver from 'semver';

function changePackageJsonVesion(path, version) {
  const json = JSON.parse(readFileSync(path).toString());
  console.log(`  from ${json.version} to ${version} for ${path}`);
  json.version = version;
  writeFileSync(path, JSON.stringify(json, null, 2));
}

const [, , bump = undefined] = process.argv;

const graph = readCachedProjectGraph();
const mainPackajgeJson = JSON.parse(readFileSync(`package.json`).toString());

if (['major', 'minor', 'patch'].indexOf(bump) >= 0) {
  const nextVersion = semver.inc(mainPackajgeJson.version, bump);
  console.log(chalk.green(`Bumping project version to next minor: ${nextVersion}`));

  for (const lib of graph.dependencies['release']) {
    console.log(`changing package.json for ${lib.target}`);
    changePackageJsonVesion(`dist/packages/${lib.target}/package.json`, nextVersion);
    changePackageJsonVesion(`packages/${lib.target}/package.json`, nextVersion);
  }
}

const prompt = promptSync({sigint: true})
const otp = prompt(`Enter npm OTP code: `)

for (const lib of graph.dependencies['release']) {
  process.chdir(`dist/packages/${lib.target}`);
  const json = JSON.parse(readFileSync(`package.json`).toString());
  console.log(chalk.green(`Publishing to npm ${lib.target}@${json.version}`));
  execSync(`npm publish --access public --tag latest --otp ${otp}`);
  process.chdir(`../../..`);
}
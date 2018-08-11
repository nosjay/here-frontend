// clean up `dist` directory using custom method
// and disable by `vue-cli-service build --no-clean`
/* eslint-disable */
const fs = require('fs');
const path = require('path');
const util = require('util');
const rimraf = require('rimraf');
const {
  error, info, done,
} = require('@vue/cli-shared-utils');
const vueConfig = require('../vue.config');
const files = require('./clean.exclude');

const rm = util.promisify(rimraf);
const readdir = util.promisify(fs.readdir);


class CleanService {
  static async cleanup(excludeFiles) {
    return new Promise(async (resolve) => {
      const outputDir = path.resolve(vueConfig.outputDir);
      const names = await readdir(outputDir);

      for (const name of names) {
        if (excludeFiles.indexOf(name) === -1) {
          const absolutePath = `${outputDir}/${name}`;
          info(`Remove file ${absolutePath}`);
          await rm(absolutePath);
        }
      }

      done('Clean success');
      resolve();
    });
  }
}

// start clean useless files
CleanService.cleanup(files).catch((err) => {
  error(err);
  process.exit(1);
});

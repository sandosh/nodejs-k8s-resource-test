// there is bug in PM2 that ignore command line `--instances` option with pm2-runtime/docker CLIs
// so we have that wrapper/workaround to load `/app/app.json` and supply it with instances property

const path = require('path');
const processConfig = require(path.join(process.cwd(), 'app.json'));
const nodeInstances = process.env.NODE_INSTANCES || 1;
let appConfig;

// app.json config could be sporting different formats, need to account for all of them

// 1. new format with explicit `apps` key.
if (processConfig.apps) {
  // consider first in the list as the main container app
  appConfig = processConfig.apps[0];
// 2. old, multi app format – array of configs
} else if (Array.isArray(processConfig)) {
  // consider first in the list as the main container app
  appConfig = processConfig[0];
// 3. old single app format - simple object
} else {
  appConfig = processConfig;
}

// update number of instances in the (main) app config
appConfig.instances = nodeInstances;

// return the whole thing to pm2
module.exports = processConfig;

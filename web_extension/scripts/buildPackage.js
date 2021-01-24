const { execSync } = require('child_process');

// FILENAMES
const manifestFileName = 'manifest.json';

// DIRECTORIES
const buildDir = './build/';
const extensionDir = './extras/';
const outputs = './';

// OUTPUTS
const chromeOutput = 'greetings-chrome.zip';

console.log('Building Extension Packages');

console.log('***COPYING MANIFEST FILE***\n\n');
execSync(`cp ${extensionDir}${manifestFileName} ${buildDir}${manifestFileName}`);

execSync(`zip -r ${outputs}${chromeOutput} ${buildDir}`);
console.log('***CHROME BUILT SUCCESSFULLY***\n\n');

execSync(`./node_modules/.bin/web-ext build -s ${buildDir} -a ${outputs} --overwrite-dest`);
console.log('***FIREFOX BUILT SUCCESSFULLY***');

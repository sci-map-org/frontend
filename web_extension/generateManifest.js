const fs = require('fs');

const [_node, _file, ...scriptArgs] = process.argv;

const isDev = scriptArgs.indexOf('--dev') > -1;

const manifest = {
  name: `Mapedia${isDev ? ' Dev' : ''}`,
  short_name: `Mapedia${isDev ? ' Dev' : ''}`,
  description: 'Web extension for mapedia',
  version: '1.0.0',
  manifest_version: 2,
  permissions: ['cookies', 'tabs', isDev ? 'http://localhost/' : 'https://*.mapedia.org/'],
  browser_action: {
    default_title: 'Mapedia',
    default_popup: 'index.html',
  },
};

const buildDirectory = `./web_extension/build/${isDev ? 'development' : 'production'}`;
if (!fs.existsSync(buildDirectory)) {
  fs.mkdirSync(buildDirectory);
}

const path = `${buildDirectory}/manifest.json`;

fs.writeFileSync(path, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`Successfully generated manifest to ${path}`);

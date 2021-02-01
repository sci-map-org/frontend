const fs = require('fs');

const [_node, _file, ...scriptArgs] = process.argv;

const isDev = scriptArgs.indexOf('--dev') > -1;

const manifest = {
  name: `Sci-Map${isDev ? ' Dev' : ''}`,
  short_name: `Sci-Map${isDev ? ' Dev' : ''}`,
  description: 'Web extension for sci-map',
  version: '1.0.0',
  manifest_version: 2,
  permissions: ['cookies', 'tabs', isDev ? 'http://localhost/' : 'https://*.sci-map.org/'],
  browser_action: {
    default_title: 'Sci-Map',
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

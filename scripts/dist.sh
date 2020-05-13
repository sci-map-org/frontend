# If the directory, `dist`, doesn't exist, create `dist`
stat dist || mkdir dist
# Archive artifacts
# zip $npm_package_name.zip -r .next package.json yarn.lock .elasticbeanstalk .npmrc .ebextensions next.config.js
# zip $npm_package_name.zip -r .

# =====docker mode======
# zip $npm_package_name.zip -r pages src static public tsconfig.json next.config.js next-env.d.ts .babelrc package.json yarn.lock Dockerfile .dockerignore

# # If the directory, `dist`, doesn't exist, create `dist`
# stat dist || mkdir dist
# # Archive artifacts (node mode on eb)
# zip $npm_package_name.zip -r dist .next package.json yarn.lock next.config.js static public next.config.js .npmrc npm-shrinkwrap.json

# # (node docker mode)
zip $npm_package_name.zip Dockerrun.aws.json
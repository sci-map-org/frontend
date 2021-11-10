## Sci-Map.org frontend

Frontend for [Sci-map.org](https://sci-map.org).

### Tech stack and design

React, Next.js, Apollo Client, Chakra UI

## Known issues

Using avatar triggers a useless request all the time -> https://github.com/chakra-ui/chakra-ui/issues/149
Do not use local storage (next.js...)
Codegen: use same name for the export as the graphql query/mutation name -> c.f. ResourcePage (https://github.com/dotansimha/graphql-code-generator/issues/3244)
Using @react-icons/all-files as parcel seems to have issues with tree shaking it properly
react-sortable-tree needs a patch to work with React 17. (https://github.com/frontend-collective/react-sortable-tree/issues/821)


Nesting fragments too deeply breaks apollo client, some subfields of data are empty object

## Setup


Create a `.env.local` file with

```
NODE_ENV=development or production
FRONTEND_URL=http://localhost:3000 or https://sci-map.org
API_URL="http://localhost:8000/graphql" or "https://api.sci-map.org/graphql"
GOOGLE_CLIENT_ID=390325140829-njk2aup9efs7tprmpmqmke93886q602i.apps.googleusercontent.com
DISCOURSE_FORUM_URL=https://forum.sci-map.org
AWS_ACCESS_KEY_ID=key
AWS_SECRET_KEY=secret
AWS_REGION=eu-central-1
```

AWS is only used for cloudwatch metrics, you can keep the dummy values

### Development

```
    yarn
    yarn dev
```

### Build

```
    yarn build
    yarn start
```

## Extension setup

```
yarn dev:ext
```

```
yarn build:ext
```

In Chrome, go to Extensions, enable developer mode then load unpacked => pick production build or development build
env vars are taken from .env.production.local or .env.development.local, so pick env vars accordingly (dev should point to localhost, prod to sci-map.org)

## Contributing

Please check out our [Contribution guide](https://sci-map.org/about/contributing).

## License

Licensed under [GNU GPL v3.0](https://choosealicense.com/licenses/gpl-3.0/): You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.

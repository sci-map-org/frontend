## Sci-Map.org frontend

Frontend for [Sci-map.org](https://sci-map.org).

### Tech stack and design

React, Next.js, Apollo Client, Chakra UI

## Known issues

Using avatar triggers a useless request all the time -> https://github.com/chakra-ui/chakra-ui/issues/149
Do not use local storage (next.js...)
Codegen: use same name for the export as the graphql query/mutation name -> c.f. ResourcePage (https://github.com/dotansimha/graphql-code-generator/issues/3244)
ColorProvider breaks SSR styled-system (different classnames error)

## Contributing

Please check out our [Contribution guide](https://sci-map.org/about/contributing).

## License

Licensed under [GNU GPL v3.0](https://choosealicense.com/licenses/gpl-3.0/): You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.

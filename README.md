## Frontend app

### Tech stack and design

Next.js, apollo client, Chakra UI

## Known issues

Using avatar triggers a useless request all the time -> https://github.com/chakra-ui/chakra-ui/issues/149
Do not use local storage (next.js...)
Codegen: use same name for the export as the graphql query/mutation name -> c.f. ResourcePage (https://github.com/dotansimha/graphql-code-generator/issues/3244)
ColorProvider breaks SSR styled-system (different classnames error), totally fucks up dev hot reloading

## Possible Improvements

Better graphql support: have queries in component files and generate hooks next to them. They're too use case based.
Have fragments and common queries in graphql folder, shared files ?
Do not use .graphql again, but rather .gql.ts
One single generated file ? Would be easier to manage ? Name conflicts (queries have to be named)

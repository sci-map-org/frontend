## Frontend app

### Tech stack and design

Next.js, apollo client, Chakra UI

## Known issues

Using avatar triggers a useless request all the time -> https://github.com/chakra-ui/chakra-ui/issues/149

## Possible Improvements

Better graphql support: have queries in component files and generate hooks next to them. They're too use case based.
Have fragments and common queries in graphql folder, shared files ?
Do not use .graphql again, but rather .gql.ts
One single generated file ? Would be easier to manage ? Name conflicts (queries have to be named)

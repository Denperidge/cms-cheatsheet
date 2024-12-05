# cms-cheathseet
Boilerplate & commonly-used code is inevitable, but remembering all of them out of the back of your head isn't usually an option. Trying to look up solutions online can lead to dead links, removed comments, and important solutions being hidden in a randomly named gist. This project aims to be an appendage to developers' bug databases; any amount of quick solutions, easily found & copied. Statically generated with minimal JavaScript usage to ensure it is quick in usage.

This project works using [Directus](https://directus.io/) by default, but can take any JSON input.


## How-to
### Cloning & running locally
Building this project requires Node.js & Yarn.
```bash
git clone https://github.com/Denperidge/cms-cheatsheet
cd cms-cheatsheet
yarn install

yarn start  # Run on localhost:8080
yarn build  # Build to dist/
```

You can choose two methods to add data:
1. [Using your own Directus instance](#using-your-own-directus-instance)
2. Manually editing the JSON files in [src/_data](src/_data/), or using your own JSON-outputting (CMS) solution.

### Using your own Directus instance
1. Open [.directus.schema.json](.directus.schema.json) and edit it as wanted. If you change the table name, please make sure to replace the times it is used in the code (see [src/](src/) & [package.json](package.json)).
2. Add the schema to your [Directus instance using directus-to-data](https://github.com/Denperidge/directus-to-data/#backup--restore-collection-schema)
3. Configure `.directus.json`
   ```json
   {
    "cmsUrl": "https://cms.example.com",
    "staticToken": "DAE_DOJ?1-edOJQHDS"
   }
   ```
4. Use `yarn data` to update your data, and `yarn data:pull:schema` to backup any schema changes to [.directus.schema.json](.directus.schema.json) (pulling the schema changes requires an admin token).

## License
This project is licensed under the [MIT License](LICENSE).

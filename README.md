# Portfolio

-   [Portfolio](#portfolio)
    -   [About project](#about-project)
        -   [Techs used](#techs-used)
        -   [Project Structure](#project-structure)
        -   [Dependencies](#dependencies)
    -   [Development](#development)
        -   [Clone repo](#clone-repo)
        -   [Development server](#development-server)
        -   [Linting](#linting)
        -   [Prettier](#prettier)
        -   [Building and preview](#building-and-preview)
    -   [Deployment](#deployment)

## About project

### Techs used

-   Vite
-   Vue3
-   TailwindCSS
-   Three.js

### Project Structure

```bash
.
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── layouts
│   ├── main.js
│   ├── router
│   ├── staticData.js
│   └── views
├── tailwind.config.js
└── vite.config.js

7 directories, 11 files
```

### Dependencies

| Dependency |                                      |
| :--------- | :----------------------------------: |
| vue        |                 Vue3                 |
| three      |    Implementation of skill could     |
| vue-router |          Handles navigation          |
| debounce   | To debounce expensive function calls |

## Development

### Clone repo

```bash
$ git clone git@github.com:venkivijay/pf.git
$ cd pf
$ npm install
```

### Development server

Run `npm run dev` to spin up a development server. Navigate to port 3000 on either localhost or on your network IP. The app will automatically reload if you change any of the source files.

### Linting

Run `npm run lint-yell` to get lint errors. Notice that this will not fix it by default. To fix lint errors, run `npm run lint`.

### Prettier

Run `npm run pretty-yell` to get files that are not prettified. To prettify, run `npm run pretty`.

### Building and preview

Run `npm run build` to build for production. Build files will be placed in `dist` directory. Run `npm run serve` to serve the production build.

## Deployment

Currently, deployment is handled by Netlify. Pushing code to `dev branch` will automatically trigger a deploy.

[![Netlify Status](https://api.netlify.com/api/v1/badges/bd039447-bb78-4d60-bcbb-a9a30fbb51c4/deploy-status)](https://app.netlify.com/sites/dev-portfolio-venkivijay/deploys)

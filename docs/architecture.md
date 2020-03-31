# Architecture

- [Architecture](#architecture)
  - [`.circleci`](#circleci)
  - [`.vscode`](#vscode)
  - [`docs`](#docs)
  - [`public`](#public)
    - [`index.html`](#indexhtml)
  - [`src`](#src)
    - [`api`](#api)
    - [`app`](#app)
    - [`assets`](#assets)
    - [`design`](#design)
    - [`router`](#router)
    - [`store`](#store)
    - [`utils`](#utils)
    - [`App.vue`](#appvue)
    - [`main.ts`](#maints)
  - [`tests`](#tests)

## `.circleci`

Configuration for continuous integration with [Circle CI](https://circleci.com/). See [the production doc](production.md#from-circle-ci) for more.

## `.vscode`

Settings and extensions specific to this project, for Visual Studio Code. See [the editors doc](editors.md#visual-studio-code) for more.

## `docs`

You found me! :wink:

## `public`

Where you'll keep any static assets, to be added to the `dist` directory without processing from our build system.

### `index.html`

This one file actually _does_ get processed by our build system, allowing us to inject some information from Webpack with [EJS](http://ejs.co/), such as the title, then add our JS and CSS.

## `src`

Where we keep all our source files.

### `api`

Where we keep all files that related to API calls. See [the API doc](api.md) for more details.

### `app`

Where we will work most of the time. All components should be placed here. See [the App doc](app.md) for more details.

### `assets`

This project manages assets via Vue CLI. Learn more about [its asset handling here](https://cli.vuejs.org/guide/html-and-static-assets.html).

### `design`

Where we keep our [design variables and tooling](tech.md#design-variables-and-tooling).

### `router`

Where the router, routes, and any routing-related components live. See [the routing doc](routing.md) for more details.

### `store`

Where all our global state management lives. See [the store management doc](store.md) for more details.

### `utils`

These are utility functions you may want to share between many files in your application. They will always be pure and never have side effects, meaning if you provide a function the same arguments, it will always return the same result. These should also never directly affect the DOM or interface with our Vuex state.

### `App.vue`

The root Vue component that simply delegates to the router view. This is typically the only component to contain global CSS.

### `main.ts`

The entry point to our app, were we create our Vue instance and mount it to the DOM.

## `tests`

Where all our tests go. See [the tests doc](tests.md) for more.

# **Blackjack**

Blackjack is a card game played with 52 cards without jokers. The objective of the game is to achieve a higher score than the dealer without going over 21 points.
You can check out and play the game here:

[Blackjack-Demo](https://darwinbecker.github.io/blackjack/)


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

1. Install all node modules:

```sh
npm install
```

2. Start the development server, that compiles and hot-reloads on every change:

```sh
npm run dev
```

## Additional Commands


Run the Jest test suite:

```sh
npm run test
```

Create a type-checked, compiled and minified build for production:

```sh
npm run build
```

Deploy the project to gh-pages:

```sh
npm run deploy
```

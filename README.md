## Welcome to the MetaGame Demo!

This repository leverages AWS Amplify for the backend.

## Overview

The MetaGame site is a visually appealing and enjoyable way to discover new games and learn more about them.

## Tech Stack
- React: As the view layer.
- Vite: Build tools and development server
- AWS Amplify: The backend which manages for Auth, GraphQL APIs, 3rd-party service integration.
- React-Query: For simplifying the network layer, caching data, etc.
- ViTest/Testing Library: For comprehensive unit tests.
- Cypress: For E2E tests.
- Prettier/ESLint: For code formatting and rules.

## Local setup:
1. Put amplify_outputs.json file in the root directory.
1. `npm install`
1. `npm run dev`

## Tooling

To run unit tests:  `npm run test`   
To run Cypress (E2E) tests: `npm run cy:run`   
To launch Cypress: `npm run cy:open`   
Run formatting: `npm run format`  

## Known issues

- On FireFox mobile: Extra whitespace between carousels, seems exclusive to FF mobile, cannot recreate on Chrome Mobile or in responsive on Desktop browser


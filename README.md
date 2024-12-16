## Welcome to the MetaGame Demo!

This repository leverages AWS Amplify for the backend.

## Overview

The MetaGame site is a visually appealing and enjoyable way to discover new games, learn more about them and add them to a wishlist.

## Tech Stack
- React: As the view layer.
- Vite: Build tools and development server
- AWS Amplify: The backend which manages for Auth, GraphQL APIs, 3rd-party service integration.
- React-Query: For simplifying the network layer, caching data, etc.
- ViTest/Testing Library: For comprehensive unit tests.
- Cypress: For E2E tests.
- Prettier/ESLint: For code formatting and rules.

## Local setup:

npm install
npm run dev

## Credentials

Put the amplify_outputs.json file in the root directory.

## Testing

Run `npm run test`

## Known issues

- On FireFox mobile: Extra whitespace between carousels, seems exclusive to FF mobile, cannot recreate on Chrome Mobile or in responsive on Desktop browser

## Future improvements

Priority list:
- Cypress tests (at least one)
- More unit tests
- Replace "< " and ">" with SVG arrow for a better look
- Groom comments, look for last minute cleanup items
- More content for details page! It is pretty limited.

Stretch goals:
- Fonts: Default fonts are boring
- Network Error handling
- Get text localization-ready

Done: 
- (DONE) Details preview card does not have a consistent layout across screen sizes
- (Not doing) Default scrollbars should be replaced with a more appealing scroll
- (Done) Padding on the details page should be adjusted
- (Not doing) On first page, there is too much empty space / background image is too large on max resolution
- (Done) On preview details the Y should translate into the viewport preventing cutoff


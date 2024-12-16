// TODO: would prefer to mock the API calls but

import { selectors } from "../support/selectors";

// will rely on real API for time being
describe('carousel spec', () => {
  const { overviewPage } = selectors;
  it('navigate carousel on small device', () => {
    const { carousel, gameCovers } = overviewPage;
    cy.viewport(550, 750);
    cy.visit('http://localhost:5173')
    cy.get(selectors.fullPageLoader).should('be.visible');
    cy.get(selectors.fullPageLoader).should('not.be.visible')
    const firstCarousel =  cy.get(carousel).first();
    const covers = firstCarousel.find(gameCovers);

    // API returns 16 but we duplicate one group and with and groupSize of 2
    // we should expect 18
    covers.should('have.length', 18);

    // Validate the expected elements are on-screen
    

  })
})
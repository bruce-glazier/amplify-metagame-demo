import { selectors } from "../support/selectors";

describe('carousel spec', () => {
  const { overviewPage } = selectors;

  it('navigate carousel on small device', () => {
    const { carousel, gameCovers, carouselGroup, gameCover, nextButton, backButton } = overviewPage;
    cy.viewport(550, 750);
    cy.visit('http://localhost:5173')
    cy.get(selectors.fullPageLoader).should('be.visible');
    cy.get(selectors.fullPageLoader).should('not.be.visible')

    // API returns 16 but we duplicate one group and with and groupSize of 2
    // we expect 18
    cy.get(carousel).first().find(gameCovers).should('have.length', 18);

    // Validate the expected elements are on-screen
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(2));
 
    // Navigate to the next page
    // Note: mouse hover in Cypress doesn't work so we manually set the style to show the button
    cy.get(carousel).first().find(nextButton).invoke('attr', 'style', ' display: block;').click();
    cy.wait(600); // Delay for animation to complete

    // Validate that the first group of games is no longer in the focused group
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(2)).should('not.exist');
    // Validate that the next group of games is in the foucsed group
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(4));

    // Go back and verify the first group of games is in the focused group again
    cy.get(carousel).first().find(backButton).invoke('attr', 'style', ' display: block;').click();
    cy.wait(600);
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(2));
  })

  it('navigate carousel on medium device', () => {
    const { carousel, gameCovers, carouselGroup, gameCover, nextButton, backButton } = overviewPage;
    cy.viewport(650, 750);
    cy.visit('http://localhost:5173')
    cy.get(selectors.fullPageLoader).should('be.visible');
    cy.get(selectors.fullPageLoader).should('not.be.visible')

    // API returns 16 but we duplicate one group and with and groupSize of 4
    // we expect 20
    cy.get(carousel).first().find(gameCovers).should('have.length', 20);

    // Validate the expected elements are on-screen
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(5));
 
    // Navigate to the next page
    // Note: mouse hover in Cypress doesn't work so we manually set the style to show the button
    cy.get(carousel).first().find(nextButton).invoke('attr', 'style', ' display: block;').click();
    cy.wait(600); // Delay for animation to complete

    // Validate that the first group of games is no longer in the focused group
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(5)).should('not.exist');
    // Validate that the next group of games is in the foucsed group
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(8));

    // Go back and verify the first group of games is in the focused group again
    cy.get(carousel).first().find(backButton).invoke('attr', 'style', ' display: block;').click();
    cy.wait(600);
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(5));
  })

  it('navigate carousel on large device', () => {
    const { carousel, gameCovers, carouselGroup, gameCover, nextButton, backButton } = overviewPage;
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:5173')
    cy.get(selectors.fullPageLoader).should('be.visible');
    cy.get(selectors.fullPageLoader).should('not.be.visible')

    // API returns 16 but we duplicate one group and with and groupSize of 8
    // we expect 24
    cy.get(carousel).first().find(gameCovers).should('have.length', 24);

    // Validate the expected elements are on-screen
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(8));
 
    // Navigate to the next page
    // Note: mouse hover in Cypress doesn't work so we manually set the style to show the button
    cy.get(carousel).first().find(nextButton).invoke('attr', 'style', ' display: block;').click();
    cy.wait(600); // Delay for animation to complete

    // Validate that the first group of games is no longer in the focused group
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(8)).should('not.exist');
    // Validate that the next group of games is in the foucsed group
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(0));

    // Go back and verify the first group of games is in the focused group again
    cy.get(carousel).first().find(backButton).invoke('attr', 'style', ' display: block;').click();
    cy.wait(600);
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(8));
  })

  it('can navigate to the details page and back', () => {
    const { carousel, carouselGroup, gameCoverDetails, gameCover } = overviewPage;
    cy.viewport(550, 750);
    cy.visit('http://localhost:5173')

    cy.get(selectors.fullPageLoader).should('be.visible');
    cy.get(selectors.fullPageLoader).should('not.be.visible')

    // Again since hover is not an option we manually force it to become visible
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(2)).find(gameCoverDetails(2)).invoke('attr', 'style', 'visibility: visible; z-index: 255;');
  
    // Click the "Learn More" link
    cy.get(carousel).first().find(carouselGroup(1)).find(gameCover(2)).find(gameCoverDetails(2)).find('a').click()

    // Validate that we've landed on the details page
    cy.get(selectors.detailsPage.container)

    // Validate that we can return
    cy.go('back');
    cy.get(carousel)
    cy.get(selectors.detailsPage.container).should('not.exist');
  })
})
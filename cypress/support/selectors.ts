export const selectors = {
    overviewPage: {
        carousel: '[data-testId="carousel-root"]',
        gameCovers: '[data-testid^="game-cover-container-"]',
        gameCover: (coverIndex: number) => `[data-testId="game-cover-container-${coverIndex}"]`,
        gameCoverDetails: (coverIndex: number) => `[data-testId="game-cover-details-${coverIndex}"]`,
        carouselGroup: (groupIndex: number) => `[data-testId="carousel-group-${groupIndex}"]`,
        nextButton: '[data-testId="next-button"]',
        backButton: '[data-testId="prev-button"]',
    },
    detailsPage: {
        container: '[data-testId="details-page-container"]'
    },
    fullPageLoader: '[data-testId="full-page-loader"]',
}
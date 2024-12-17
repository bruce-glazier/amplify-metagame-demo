export const selectors = {
    overviewPage: {
        carousel: '[data-testid="carousel-root"]',
        gameCovers: '[data-testid^="game-cover-container-"]',
        gameCover: (coverIndex: number) => `[data-testid="game-cover-container-${coverIndex}"]`,
        gameCoverDetails: (coverIndex: number) => `[data-testid="game-cover-details-${coverIndex}"]`,
        carouselGroup: (groupIndex: number) => `[data-testid="carousel-group-${groupIndex}"]`,
        nextButton: '[data-testid="next-button"]',
        backButton: '[data-testid="prev-button"]',
    },
    detailsPage: {
        container: '[data-testid="details-page-container"]'
    },
    fullPageLoader: '[data-testid="full-page-loader"]',
}
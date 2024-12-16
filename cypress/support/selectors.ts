export const selectors = {
    overviewPage: {
        carousel: '[data-testId="carousel-root"]',
        gameCovers: '[data-testid^="game-cover-"]',
        gameCover: (coverIndex: number) => `[data-testId="game-cover-${coverIndex}"]`
    },
    fullPageLoader: '[data-testId="full-page-loader"]',
}
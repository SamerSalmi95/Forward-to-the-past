const { describe } = require("node:test");
const { extractMoviesFromCart, isSagaMovie, getDistinctSagaMoviesNumber, getDiscountMultiplier, getCartMoviesPrices, calculateCartPrice } = require("./utils");

describe('extractMoviesFromCart', () => {
    it('should return an empty array when cart type is different than string', () => {
        const cart = 762;

        expect(extractMoviesFromCart('\n', cart)).toEqual([]);
    })
    it('should extract movies correctly', () => {
        const cart = 'Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nLa chèvre';

        expect(extractMoviesFromCart('\n', cart)).toEqual(["Back to the Future 1", "Back to the Future 2", "Back to the Future 3", "La chèvre"]
        );
    })
})

describe('isSagaMovie', () => {
    it('should return true when movie contains saga movie name', () => {
        const saga = "pirates of the caribbean";

        expect(isSagaMovie("Pirates of The Caribbean 5", saga)).toBeTruthy();
    })
    it('should return false when movie does not contain saga movie name', () => {
        const saga = "harry poter";

        expect(isSagaMovie("Pirates of The Caribbean 5", saga)).toBeFalsy();
    })
})

describe('getDistinctSagaMoviesNumber', () => {
    it('should return distinct saga movies number correctly', () => {
        const saga = "pirates of the caribbean";
        const movies = ['pirates of the caribbean 2', 'pirates of the caribbean 5', 'pirates of the caribbean 2', 'pirates of the caribbean 3', 'harry potter']

        expect(getDistinctSagaMoviesNumber(movies, saga)).toEqual(3);
    })
})

describe('getDiscountMultiplier', () => {
    it('should return correct discount multiplier', () => {
        expect(getDiscountMultiplier(4)).toEqual(0.8);
        expect(getDiscountMultiplier(3)).toEqual(0.8);
        expect(getDiscountMultiplier(2)).toEqual(0.9);
        expect(getDiscountMultiplier(1)).toEqual(1);
        expect(getDiscountMultiplier(0)).toEqual(1);
    })
})

describe('getCartMoviesPrices', () => {
    it('should return zero prices when movies array is empty', () => {
        const saga = "Fast and furious";

        expect(getCartMoviesPrices([], saga)).toEqual({ sagaMoviesPrice: 0, otherMoviesPrice: 0 })
    })

    it('should return correct prices for saga movies and other movies', () => {
        const saga = "Fast and furious";
        const movies = ["fast and furious 2", "fast and furious 3", "harry potter 1", "back to the future 1"]
        const sagaMoviePrice = 15;
        const otherMoviePrice = 20;

        expect(getCartMoviesPrices(movies, saga, sagaMoviePrice, otherMoviePrice)).toEqual({ sagaMoviesPrice: 30, otherMoviesPrice: 40 })
    })
})

describe('calculateCartPrice', () => {
    it('should return zero price when cart is empty', () => {
        const cart = "";
        const saga = "harry potter";
        const separator = "\n"

        expect(calculateCartPrice(cart, saga, separator, 15, 20)).toEqual(0)
    })

    it.each([
        ['Back to the Future 1\nBack to the Future 2\nBack to the Future 3', 36],
        ['Back to the Future 1\nBack to the Future 3', 27],
        ['Back to the Future 1', 15],
        ['Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nBack to the Future 2', 48],
        ['Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nLa chèvre', 56]
    ])
        ('should return correct cart price', (cart, price) => {
            const saga = "Back to the Future";
            const separator = "\n"
            const sagaMoviePrice = 15;
            const otherMoviePrice = 20;
            expect(calculateCartPrice(cart, saga, separator, sagaMoviePrice, otherMoviePrice)).toEqual(price)
        });
})
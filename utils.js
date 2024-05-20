const extractMoviesFromCart = (separator, cart) => {
    if (typeof cart !== 'string') return [];
    return cart.split(separator).filter(movie => movie.trim().length > 0);
}

const isSagaMovie = (movie, saga) => movie.toLowerCase().includes(saga.toLowerCase());

const getDistinctSagaMoviesNumber = (movies, saga) => {
    const sagaMovies = movies.filter(movie => isSagaMovie(movie, saga))
    return new Set(sagaMovies).size
}

const getDiscountMultiplier = (sagaMoviesNumber) => {
    if (sagaMoviesNumber >= 3) return 0.8;
    if (sagaMoviesNumber == 2) return 0.9;
    return 1;
}

const getCartMoviesPrices = (movies, saga, sagaMoviePrice, otherMoviePrice) => movies.reduce(
    (prices, movie) => isSagaMovie(movie, saga) ?
        ({ ...prices, sagaMoviesPrice: prices.sagaMoviesPrice + sagaMoviePrice })
        : ({ ...prices, otherMoviesPrice: prices.otherMoviesPrice + otherMoviePrice }),
    { sagaMoviesPrice: 0, otherMoviesPrice: 0 }
)

const calculateCartPrice = (cart, saga, separator, sagaMoviePrice, otherMoviePrice) => {
    const movies = extractMoviesFromCart(separator, cart);
    const distinctSagaMoviesNumber = getDistinctSagaMoviesNumber(movies, saga);
    const discountMultiplier = getDiscountMultiplier(distinctSagaMoviesNumber);
    const cartPrices = getCartMoviesPrices(movies, saga, sagaMoviePrice, otherMoviePrice);
    return cartPrices.sagaMoviesPrice * discountMultiplier + cartPrices.otherMoviesPrice;
}

module.exports = {
    extractMoviesFromCart,
    isSagaMovie,
    getDistinctSagaMoviesNumber,
    getDiscountMultiplier,
    getCartMoviesPrices,
    calculateCartPrice
}
const readline = require('readline');
const fs = require('fs');
const { calculateCartPrice } = require('./utils');
const { SAGA, MOVIES_SEPARATOR, SAGA_MOVIE_PRICE, OTHER_MOVIE_PRICE } = require('./constants');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('SIGINT', () => {
    console.log('\nLeaving so soon ?');
    rl.close();
});

rl.question('Please put the cart filename : ', (filename) => {
    if (!filename) {
        console.log('Cart fileName cannot be empty');
        rl.close();
        return;
    }

    fs.readFile(filename, 'utf8', (err, cart) => {
        if (err) {
            console.error(`Error reading the file: ${err}`);
            rl.close();
            return;
        }
        console.log(`Your cart price is : ${calculateCartPrice(cart, SAGA, MOVIES_SEPARATOR, SAGA_MOVIE_PRICE, OTHER_MOVIE_PRICE)}`);
        rl.close();
    });

});


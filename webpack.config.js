const path = require('path');

module.exports = {
    entry: './lib/solver.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js'
    }
};
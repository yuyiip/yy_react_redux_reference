if (process.env.NODE-ENV === 'production') {
    module.exports = require('./configureStore.prod');
} else {
    module.exports = require('./configure.dev');
}
const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
    root,
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    components: path.join(__dirname, 'src/components')
};

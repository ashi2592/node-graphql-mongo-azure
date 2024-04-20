
const yaml = require('js-yaml');
const fs   = require('fs');
const doc = yaml.load(fs.readFileSync('./swagger.yml', 'utf8'));


module.exports = function generateSwagger() {
    return doc;
};


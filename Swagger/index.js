const generateSwagger = require("../Helpers/swaggerDefinition")

module.exports = async function (context, req) {
    context.res = {
        status: 200,
        body: generateSwagger(),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

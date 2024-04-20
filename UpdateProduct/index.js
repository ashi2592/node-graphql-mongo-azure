const ProductService = require("../Helpers/Services/ProductServices")

module.exports = async function (context, req) {
    const body = req?.body;
    const params = req?.params;
    try{
        const response = await ProductService.UpdateProduct(body, params);
        context.res = {
            body: response
        };
    }catch(err)
    {
        context.res = {
            status: 500, /* Defaults to 200 */
            body: err
        };
    }
    
}
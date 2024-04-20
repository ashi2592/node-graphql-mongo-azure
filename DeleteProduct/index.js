const ProductService = require("../Helpers/Services/ProductServices")

module.exports = async function (context, req) {
    const body = req?.params;
    try{
        const response = await ProductService.deleteProduct(body);
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
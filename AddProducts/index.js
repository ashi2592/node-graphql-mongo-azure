const ProductService = require("../Helpers/Services/ProductServices")

module.exports = async function (context, req) {
    const body = req?.body;
    // const data= {productName:"product 1"};
 
    try{
        const response = await ProductService.addProducts(body);
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
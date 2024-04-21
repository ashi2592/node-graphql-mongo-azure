const { AddProductSchemaValidation, AddProductsSchemaValidation, GetProductSchemaValidation, GetProductsSchemaValidation, DeleteProductSchemaValidation, UpdateProductsSchemaValidation } = require("../schemaValidtion")
const { Products } = require("../mongoDbConnetor");
const _ = require('lodash');
// class for all product realete services
class ProductServices {
    /**
     * Add product into mongodb
     * @param {*} data 
     * @returns 
     */
    async addProduct(data) {
        try {
            const values = await AddProductSchemaValidation(data);
            if (values) {
                const ProductsObj = new Products(data);
                return await ProductsObj.save();
            }
        }
        catch (err) {
            throw err
        }
    }

    /**
     * Add bulk product into database
     * @param {*} data 
     * @returns 
     */

    async addProducts(data) {
        try {
            const values = await AddProductsSchemaValidation(data);
            if (values) {
                // const ProductsObj = new Products();
                const response = await Promise.all(_.chunk(values, 10).map(async (d) => {
                    return await Products.collection.insertMany(d);
                }))
                return response;
            }
        }
        catch (err) {
            throw err
        }
    }

    /**
     * get product
     * @param {*} data 
     * @returns 
     */

    async getProduct(data) {
        try {
            const values = await GetProductSchemaValidation(data);
            if (values) {
                return await Products.findById(data.id);
            }
        } catch (err) {
            throw err
        }
    }


    /**
     * get product
     * @param {*} data 
     * @returns 
     */

    async getProducts(data) {
        try {
            const values = await GetProductsSchemaValidation(data);
            if (values) {
                const options = {
                    page: data?.page || 1,
                    limit: data?.limit || 100
                };

                return await Products.paginate({}, options)
            }
        } catch (err) {
            throw err
        }
    }

    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async deleteProduct(data) {
        try {
            const values = await DeleteProductSchemaValidation(data);
            if (values) {
                return await Products.findByIdAndDelete(data.id);
            }
        } catch (err) {
            throw err
        }
    }

    /**
     * Update Product
     * @param {*} data 
     * @param {*} query 
     * @returns 
     */
    async UpdateProduct(data, id) {
        try {
            const values = await UpdateProductsSchemaValidation(data);
            if (values) {
                const productObject =  await Products.findById(id);
                productObject.productName = data.productName;
                productObject.productImageurl = data.productImageurl;
                const response = await productObject.save()
                return response;
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = new ProductServices()
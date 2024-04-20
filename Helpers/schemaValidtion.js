const { AddProductSchema, AddProductsSchema, GetProductSchema, GetProductsSchema, DeleteProductSchema, UpdateProductSchema} = require("./joiSchema/schema")

const SchemaValidtion = async (schema, data) => {
    try {
        return await schema.validateAsync(data);
    }
    catch (err) {
        throw err.details
    }
}
const AddProductSchemaValidation = async (data) => await SchemaValidtion(AddProductSchema, data)
const AddProductsSchemaValidation = async (data) => await SchemaValidtion(AddProductsSchema, data)
const GetProductSchemaValidation = async (data) => await SchemaValidtion(GetProductSchema, data)
const GetProductsSchemaValidation = async (data) => await SchemaValidtion(GetProductsSchema, data)
const DeleteProductSchemaValidation = async(data) => await SchemaValidtion(DeleteProductSchema, data);
const UpdateProductsSchemaValidation = async (data) => await SchemaValidtion(UpdateProductSchema, data)

module.exports = {
    SchemaValidtion,
    AddProductSchemaValidation,
    AddProductsSchemaValidation,
    GetProductSchemaValidation,
    GetProductsSchemaValidation,
    DeleteProductSchemaValidation,
    UpdateProductsSchemaValidation

}

const Joi = require('joi');

const UserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


const AddProductSchema = Joi.object({
    productName: Joi.string().min(3).max(300).required(),
    productImageurl: Joi.string().min(3).max(300),
})

const AddProductsSchema = Joi.array().items(AddProductSchema)

const GetProductSchema = Joi.object({
    id: Joi.string().min(3).max(40).required()
})



const GetProductsSchema = Joi.object({
  limit: Joi.number().max(100),
  page: Joi.number(),
  where: Joi.string()
})

const DeleteProductSchema = Joi.object({
    id: Joi.string().min(3).max(40).required()
})

const UpdateProductSchema = Joi.object({
    productName: Joi.string().min(3).max(300).required(),
    productImageurl: Joi.string().min(3).max(300),
})


module.exports = {
    UserSchema,
    AddProductSchema,
    AddProductsSchema,
    GetProductSchema,
    GetProductsSchema,
    DeleteProductSchema,
    UpdateProductSchema
}


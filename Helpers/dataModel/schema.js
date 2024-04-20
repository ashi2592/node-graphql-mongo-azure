const mongoose= require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

// mongoose DDL for products
const productSchema = new mongoose.Schema({
    productName: String,
    productImageurl: String,
    createdAtDate: {type: Date, default: Date.now}
})

// Add Additional pluged in mongoose
productSchema.plugin(mongoosePaginate);

module.exports = {
    productSchema
}
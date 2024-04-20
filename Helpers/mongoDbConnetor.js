const mongoose = require('mongoose');

// import 
const {productSchema} = require("./dataModel/schema")

async function getConnection() {
    try{
     await   mongoose.connect(`${DATABASE_CONNECTION_STRING}/${DATABASE_NAME}`);
    }catch(err)
    {
        console.log("error in connection in mongodb")
    }
}
// connection strings
const DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
const DATABASE_NAME= process.env.DATABASE_NAME;
//connection with mongoDB
getConnection().then((response)=>{
console.log("mongoDb connected")
})

var Products = mongoose.model(process.env.PRODUCT_COLLETION, productSchema); 

module.exports = {
    Products: Products
}
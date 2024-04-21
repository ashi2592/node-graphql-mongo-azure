const { ApolloServer, gql } = require('apollo-server-azure-functions');
const ProductService = require("../Helpers/Services/ProductServices")

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type product {
        productName:String
        productImageurl: String
        _id: String
    }
    type Products {
        docs:[product]
        totalDocs: Int
        limit: Int
        totalPages: Int
        page: Int
        pagingCounter: Int
    }
    type Query {
        getProduct(id: String): product
        getProducts(page: Int, limit: Int): Products

    }


    input productInput {
        productName:String
        productImageurl: String
    }

    type Mutation {
        AddProduct(input: productInput): product
        AddProducts(input: [productInput]): [product]
        UpdateProduct(id: String, input: productInput):product
        DeleteProduct(id:String): product
 
      }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        getProduct: async (obj, agrs, context, info) => await ProductService.getProduct(agrs),
        getProducts: async (obj, agrs, context, info) => await ProductService.getProducts(agrs),
        
    },
    Mutation:{
        AddProduct: async (input,agrs) =>  await ProductService.addProduct(agrs.input),
        AddProducts: async (input,agrs) =>  await ProductService.addProducts(agrs.input),
        UpdateProduct: async (input,args) => await ProductService.UpdateProduct(args.input,args.id),
        DeleteProduct: async (input,args) => await ProductService.deleteProduct({id: args.id})
    }    
};

const server = new ApolloServer({ typeDefs, resolvers });
exports.graphqlHandler = server.createHandler();
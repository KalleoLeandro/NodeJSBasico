const conn = require('../db/conn');

const { ObjectId } = require('mongodb');

class Product{
    constructor(name, image, price, description){
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save(){
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        })

        return product;
    }

    static async getProducts(){
        const products = await conn.db().collection('products').find().toArray();
        return products;
    }      
 
    static async getProductById(id) {
        const objectId = new ObjectId(id);
        const product = await conn
          .db()
          .collection('products')
          .findOne({ _id: objectId })
    
        return product
    }

    static async removeProductById(id){
        const objectId = new ObjectId(id);
        await conn.db().collection('products').deleteOne({ _id: objectId })
        return;
    }

    async updateProduct(id){
        const objectId = new ObjectId(id);
        conn.db().collection('products').updateOne({_id: objectId}, {$set: this});
    }
}

module.exports = Product;
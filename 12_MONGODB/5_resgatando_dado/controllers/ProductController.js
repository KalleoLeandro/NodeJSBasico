const Product = require('../models/Product');

module.exports = class ProductController{
    static async showProducts(req,res){
        const products = await Product.getProducts();
        res.render('products/all', {products});
    }

    static createProduct(req,res){
        res.render('products/create');
    }

    static async createProductPost(req,res){
        const product = new Product(req.body.name,
            req.body.image,
            req.body.price,
            req.body.description)

        await product.save();
        res.redirect('/products')      
    }

    static async getProduct(req,res){
        const id = req.params.id;
    
        const product = await Product.getProductById(id);
        res.render('products/product', {product})
    }
}
const mongoose =require("mongoose")

const productSchema = new mongoose.Schema({
    id:{type:String,required:true},
    title:{type:String,required:true},
    limit:{type:String},
    mainImage:{type:String,required:true},
    sizes:[{type:String}],
    images:[{type:String}],

})


const CartItemSchema = new mongoose.Schema({
    product:productSchema,
    qty:{type:Number,required:true},
    size:{type:String},
    
})


const CartItem = mongoose.model("cartItems",CartItemSchema)

module.exports = CartItem;
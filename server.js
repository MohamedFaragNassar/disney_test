const express = require("express")
const cherio = require("cherio")
const cors = require("cors")
const bodyParser = require("body-parser")

const mongoose = require("mongoose")
const CartItem = require("./models/CartItem")
 const app = express();
app.use(cors({
    origin:"*"
}))

app.use(bodyParser.json());
app.use(express.static("public"))

app.get("/products",(req,res)=>{
    const request = require('request');
    request('https://www.shopdisney.co.uk/departments/fancy-dress', 
    function (error, response, body) {
        if(error){
            res.status(500).send(error)
        }
        const $ = cherio.load(body)
        const cards  = $(".catlisting__productitem").html()
        const list = [];
        $('.catlisting__productitem').each(function (index, element) {
            const x = cherio.load(element)
            list.push({
                link:x(".js-catlisting-productlink-container").attr('href'),
                title:x(".js-catlisting-productlink-container").attr('title'),
                price:x(".price__current").attr("data-price"),
                image:x("img").attr("data-src")
            });
        });
        
        res.json(list) 
    });
})

app.get("/product/:page",(req,res)=>{
    const request = require('request');
    const page = req.params.page
    request(`https://www.shopdisney.co.uk/${page}`, 
    function (error, response, body) {
        if(error){
            res.status(500).send(error)
        }
        const $ = cherio.load(body)
        const container = $("#productDetailsColumn").html()
        const images = $(".product__product-viewer").html()
        const x = cherio.load(container)
        const y = cherio.load(images)
        let sizes = []
        $('#va-size').find(".js-variation-select").each(function (index, element) {
            sizes.push(x(element).attr("data-value"));
        });
        let imgs = []
        y("#alternative-images-horizontal").find("div").each(function (index, element) {
            const m = cherio.load(element)
            imgs.push(m("img").attr("src"));
        });
        const data = {
            id:$(".js-detail-tabs-accordion-product-id").text(),
            title: x("h1").text(),
            limit:x(".productqty__maxorder").text(),
            sizes,
            mainImage:y(".js-main-image img").attr("src"),
            images:imgs
        }
        console.log(data)
        res.json(data) 
    });
})

app.post("/cart",async(req,res)=>{
   try{
       const {details,qty,size} = req.body
    await CartItem.create({
        id:details.id,
        product:details,
        qty,
        size
    })
     res.send({success:true})
   }catch(err){
       console.log(err)
       res.status(500).send(err)
   }
})

app.get("/cart",async(req,res)=>{
   try{
      const items = await CartItem.find()
      res.json(items)
    }catch(err){
       console.log(err)
       res.status(500).send(err)
   }
})
app.post("/delitem",async(req,res)=>{
   try{
       const {id} = req.body
      await CartItem.findByIdAndDelete(id,{useFindAndModify:false})
      res.json({success:true})
    }catch(err){
       console.log(err)
       res.status(500).send(err)
   }
})

const mongoDB_URl = "mongodb://localhost:27017/disney_products";
const port = process.env.PORT || 5000;

mongoose.connect(mongoDB_URl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},) 
        .then(app.listen(port,()=>{console.log("server connected")}))
        .catch(err => console.log(err))
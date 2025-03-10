const Cart = require("../models/cart")

exports.addTocart = async(req,res)=>{
    const {productId, name,price} = req.body

    if(!productId){
        return res.status(400).json({message: "Product is missing"})
    }

    let cart = await Cart.findOne({userId: req.user.id})
    if(!cart){
        cart = new Cart({userId: req.user.id, items:[]})
    }

    const existingItem = cart.items.find((item)=>
    item.productId && item.productId.toString() === productId.tostring())

    if(existingItem){
        existingItem.quantity += 1
    }else{
        cart.items.push({productId, name, price, quantity: 1})
    }

    await cart.save()
    res.json({cart,message:"Item added to Cart"})
}

exports.getcart = async(req,res)=>{
    const cart = await Cart.findOne({userId:req.user.id})
    res.json(cart ? cart.items : [])
}
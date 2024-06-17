import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import Cart from '../models/cartModel.js';

const router=express.Router();

router.post('/',authenticate,async(req,res)=>{
    const {userid,productid}=req.body;
    const productExisted=await Cart.findOne({user:userid,product:productid});

    if(productExisted){
        productExisted.quantity +=1;
        productExisted.save();
        return res.status(200).json(productExisted);
    }else{
        try {
            const newCartProd=await Cart.create({
                product:productid,
                user:userid,
                quantity:1
            })
            res.status(200).json(newCartProd);
        } catch (error) {
            res.status(400).json(error)
        }
    }
})

router.get('/:userid',authenticate,async(req,res)=>{
    const userid=req.params.userid;
    try {
        const allInfoCartProducts=await Cart.find({user:userid}).populate('product');
        const cartProducts = allInfoCartProducts.map((acp) => ({
            _id: acp._id,
            quantity: acp.quantity,
            product: {
                _id: acp.product._id,
                name: acp.product.name,
                image: acp.product.image,
                brand: acp.product.brand,
                description: acp.product.description,
                price:acp.product.price
            }
        }));
        res.status(200).json(cartProducts)
    } catch (error) {
        res.status(400).json({err:error});
    }
})

router.delete('/:cpid',authenticate,async(req,res)=>{
    const cpid=req.params.cpid;
    const cpExist=await Cart.findById(cpid);

    if(cpExist){
        const qty=cpExist.quantity;
        if(qty>1){
            try {
                cpExist.quantity -=1;
                cpExist.save();
                return res.status(200).json(cpExist);
            } catch (error) {
                res.status(400).json({msg:'not able to dec qty'});
            }
        }else{
            try {
                await Cart.findByIdAndDelete(cpid);
                return res.status(200).json({msg:'product removed from cart'});
            } catch (error) {
                res.status(400).json({msg:'not able to remove'});
            }
        }
    }

    return res.status(400).json({msg:'already not present'});
})

export default router;
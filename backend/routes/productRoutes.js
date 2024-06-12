import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import Product from '../models/productModel.js';
import checkIdMiddleware from '../middleware/checkIdMiddleware.js';


const router=express.Router();

router.post('/',authenticate,authorizeAdmin,async(req,res)=>{
    const {name,image,brand,category,description,quantity,price,countInStock}=req.body;

    try {
        switch (true) {
            case (!name):
                return res.json({error:"Name is required"});
            case (!brand):
                return res.json({error:"Brand is required"});
            case (!image):
                return res.json({error:"Image is required"});
            case (!category):
                return res.json({error:"Category is required"});
            case (!description):
                return res.json({error:"Description is required"});
            case (!quantity):
                return res.json({error:"Quantity is required"});
            case (!price):
                return res.json({error:"Price is required"});
            case (!countInStock):
                return res.json({error:"CountInStock is required"});
        }
    
        const newProduct=await Product.create({...req.body});
        res.json(newProduct);
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }

})

router.put('/:productid',authenticate,authorizeAdmin,async(req,res)=>{
    const {name,image,brand,category,description,quantity,price,countInStock}=req.body;

    try {
        switch (true) {
            case (!name):
                return res.json({error:"Name is required"});
            case (!image):
                return res.json({error:"Image is required"});
            case (!brand):
                return res.json({error:"Brand is required"});
            case (!category):
                return res.json({error:"Category is required"});
            case (!description):
                return res.json({error:"Description is required"});
            case (!quantity):
                return res.json({error:"Quantity is required"});
            case (!price):
                return res.json({error:"Price is required"});
            case (!countInStock):
                return res.json({error:"Stock is required"});
        }
    
        const updatedProduct=await Product.findByIdAndUpdate(req.params.productid,{
            name, image, brand, category, description, quantity, price, countInStock
        });
        await updatedProduct.save()
        res.json(updatedProduct);
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})

router.delete('/:productid',authenticate,authorizeAdmin,async(req,res)=>{

    try {
        await Product.findByIdAndDelete(req.params.productid);
        res.json({msg:"successfully deleted the product"})
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})

router.get('/',authenticate,authorizeAdmin, async(req,res)=>{


    try {
        const pageSize=6
        const keyword= req.query.keyword
        ?{name:{$regex:req.query.keyword, $options:'i'}}
        :{};

        const count=await Product.countDocuments({...keyword});
        const products=await Product.find({...keyword}).limit(pageSize)
        res.json({
            products,
            page:1,
            pages:Math.ceil(count/pageSize),
            hasMore:false
    })
    } catch (error) {
        res.status(500).json({error:"server error"})
    }
    
})

router.get('/allproducts',authenticate, authorizeAdmin, async(req,res)=>{
    try {
        const allProducts=await Product.find({}).populate("category").limit(12).sort({createAt:-1});
        res.json(allProducts);

    } catch (error) {
        res.status(500).json({error:"server error"})
    }
})

router.get('/top', async(req, res)=>{
    try {
        const products=await Product.find({}).sort({rating:-1}).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

router.get('/new', async(req,res)=>{
    try {
        const products=await Product.find({}).sort({_id:-1}).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

router.get('/:productid',async(req,res)=>{
    try {
        const product=await Product.findById(req.params.productid).populate('category');
        
        if(!product){
            return res.json({msg:"Product not found"})
        }
        res.json(product);

    } catch (error) {
        res.status(500).json({error:"server error"})
    }
})

router.post('/:productid/review',authenticate, checkIdMiddleware ,async(req,res)=>{
    const {rating, comment}=req.body;

    try {

        const existedProduct=await Product.findById(req.params.productid);

        if(existedProduct){
            const alreadyReviewed=existedProduct.reviews.find(r=>r.user.toString()===req.user._id.toString())
            if(alreadyReviewed){
                return res.status(404).json({msg:"Product already reviewed"})
            }
        }

        const review={
            name:req.user.username,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        existedProduct.reviews.push(review);  
        existedProduct.numReviews=existedProduct.reviews.length;
        existedProduct.rating=existedProduct.reviews.reduce((acc,item)=>item.rating +acc,0)/existedProduct.reviews.length

        await existedProduct.save();

        res.json({msg:"review added"})
        
    } catch (error) {
        res.status(404).json({error:"error in posting reviews"})
    }
    

})



export default router;
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import Favourite from "../models/favouriteModel.js";


const router=express.Router();

router.get('/:userId',authenticate, async(req,res)=>{
    const userId=req.params.userId
    try {
        const favourites=await Favourite.find({user:userId}).populate('product')
        const favouritesArray=favourites.map((fav)=>{return(fav.product)})
        res.status(200).json(favouritesArray);
    } catch (error) {
        console.error(error);
        res.status(404).json({msg:"error in getting favourites"});
    }
})

router.post('/',authenticate,async(req,res)=>{
    const {userId, productId}=req.body;

    const isFavExist=await Favourite.findOne({user:userId,product:productId});
    if(isFavExist){
        return res.status(400).json({msg:`this product already exists in your favourite list`});
    }

    try {
        await Favourite.create({
            user:userId,
            product:productId
        })
        res.status(200).json(`new favourite added successfully`);

    } catch (error) {
        res.status(404).json({msg:"error in adding product in favourite model"})
    }
})

router.delete('/', authenticate, async(req,res)=>{
    const {userId,productId}=req.body;

    const isFavExist=await Favourite.findOne({user:userId,product:productId});
    if(!isFavExist){
        return res.status(400).json({msg:`this product does not exists in your favourite list`});
    }

    try{
        await Favourite.findOneAndDelete({user:userId,product:productId});
        res.status(200).json({msg:'deleted successfully'});

    }catch(error){
        res.status(404).json({msg:"unable to delete from backend"})
    }
})

export default router;
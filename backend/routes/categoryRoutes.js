import express from 'express';
import zod from 'zod';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import Category from '../models/categoryModel.js';


const router=express.Router();

const categoryZodSchema=zod.object({
    name:zod.string()
})

router.post('/', authenticate, authorizeAdmin, async(req,res)=>{
    const parsedbody=categoryZodSchema.safeParse(req.body);
    if(!parsedbody.success){
        res.json({msg:"provided invalid inputs"});
        return;
    }

    const {name}=req.body;
    
    if(!name){
        return res.json({msg:"name is required"});
    }

    const category=await Category.findOne({name});

    if(category){
        res.status(404).json({msg:"category already existed"})
        return
    }

    try {
        const newCategory=await Category.create({
            name:name
        })

        res.json(newCategory);
        return;

    } catch (error) {
        res.status(404).json({error:error});
    }
})


router.put('/:categoryId',authenticate, authorizeAdmin, async(req,res)=>{

    const {categoryId}=req.params
    const {name}=req.body
    const Existcategory=await Category.findOne({_id:categoryId});

    if(!Existcategory){
        return res.status(404).json({msg:"category not found"});
        
    }

    Existcategory.name=name
    const updatedCategory=await Existcategory.save();
    res.json(updatedCategory)

})

router.get('/', authenticate, authorizeAdmin, async(req,res)=>{

    const allCategory=await Category.find({});
    res.json(allCategory);
})

router.delete('/:categoryId', authenticate, authorizeAdmin, async(req,res)=>{
    const {categoryId}=req.params
    const Existcategory=await Category.findOne({_id:categoryId});

    if(!Existcategory){
        return res.json({msg:"category not found"})
    }

    await Category.findByIdAndDelete(categoryId)
    res.json({msg:"successfully deleted"})

})

export default router;
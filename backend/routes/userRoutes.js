import express from "express";
import zod from 'zod';
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";


const router=express.Router()


const userSignupSchema=zod.object({
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string(),
})

router.post('/signup',async(req,res)=>{
    const body=req.body;
    const hash=await bcrypt.hash(req.body.password,10);
    body.password=hash;
    const parsedbody=userSignupSchema.safeParse(body);

    if(!parsedbody.success){
        return res.status(404).json({msg:"invalid inputs"});
    }

    const userExist=await User.findOne({
        email:body.email
    })

    if(userExist){
        return res.json({msg:"user already exist with this email!"})
    }

    const dbUser=await User.create({
        username:body.username,
        email:body.email,
        password:body.password
    })

    await dbUser.save()
    const userId=dbUser._id

    const token = jwt.sign({
        userId
    },process.env.JWT_SECRET,{expiresIn:"30d"})

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=="development",
        sameSite:"strict",
        maxAge:30*24*60*30*1000
    })

    res.status(201).json({
        _id: dbUser._id,
        username: dbUser.username,
        email: dbUser.email,
        isAdmin: dbUser.isAdmin,
      });
    return
})

const userSigninSchema=zod.object({
    email:zod.string().email(),
    password:zod.string()
})

router.post('/signin',async(req,res)=>{
    const body=req.body;
    const parsedbody=userSigninSchema.safeParse(body);

    if (!parsedbody.success) {
        return res.status(400).json({ message: "Invalid input provided" });
      }
    
      const userExist = await User.findOne({
        email: body.email
      });
    
      if (!userExist) {
        return res.status(400).json({ message: "You don't have an account" });
      }
    
      const isMatch = await bcrypt.compare(body.password, userExist.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

    const token=jwt.sign({
      userId:userExist._id  
    },process.env.JWT_SECRET,{expiresIn:"30d"});

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=="development",
        sameSite:"strict",
        maxAge:30*24*60*30*1000,
    })


    res.status(200).json({
        _id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        isAdmin: userExist.isAdmin,
      });
      return;
})

router.post('/logout',async(req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })

    res.status(200).json({msg:"logged out"});
})

router.get('/getallusers',authenticate,authorizeAdmin,async(req,res)=>{

    const users=await User.find({});
    res.json(users);

})

router.get('/profile',authenticate,async(req,res)=>{
    const currentUser=await User.findById(req.user._id);

    if(currentUser){
        res.json({
            _id:currentUser._id,
            username:currentUser.username,
            password:currentUser.password,
            email:currentUser.email

        })
    }else{
        res.status(401).json({msg:"no current user available !"})
    }

})


const userUpdatingSchema=zod.object({
    username:zod.string().optional(),
    email:zod.string().email().optional(),
    password:zod.string().optional(),
})

router.put('/profile',authenticate,async(req,res)=>{
    const parsedbody=userUpdatingSchema.safeParse(req.body);
    if(!parsedbody.success){
        return res.status(403).json({msg:"invalid inputs"});
    }

    console.log('Profile update request received:', req.body);
    const currentUser=await User.findById(req.user._id);

    if(currentUser){
        currentUser.username=req.body.username || currentUser.username,
        currentUser.email=req.body.email || currentUser.email

        if(req.body.password){
            const hash=await bcrypt.hash(req.body.password,10);
            currentUser.password=hash
        }

        const updatedUser=await currentUser.save();
        console.log('User updated:', updatedUser);
        return res.status(200).json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        
        })
        
    } else {
        res.status(404);
        throw new Error("User not found");
      }

})

router.delete('/:id',authenticate,authorizeAdmin,async(req,res)=>{
    const id=req.params.id;
    const userExist=await User.findById(id);

    if(userExist){
        if(userExist.isAdmin){
            res.status(400)
            throw new Error('cannot delete admin user')
        }

        await User.deleteOne({_id:userExist._id})
        res.json({msg:"user removed"})

    }else{
        res.status(400)
        throw new Error("cannot find user with provided id");
    }
    
})

router.get('/:id',authenticate,authorizeAdmin, async(req,res)=>{
    const userExist=await User.findById(req.params.id).select('-password');

    if(userExist){
        res.json(userExist);
    }else{
        res.status(400)
        throw new Error("user not found");
    }
})


export default router;
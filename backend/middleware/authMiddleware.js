import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

 const authenticate=async(req,res,next)=>{
    let token=req.cookies.jwt;

    if(token){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.userId);
            next();
        } catch (error) {
            res.status(404)
            throw new Error('not authorized, token failed');
        }
        
    }
    
} 

const authorizeAdmin=async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();

    }else{
        res.status(401).send("not authorized as admin");
    }
}

export {authenticate,authorizeAdmin};
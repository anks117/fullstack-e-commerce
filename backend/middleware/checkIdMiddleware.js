import { isValidObjectId } from "mongoose";

const checkIdMiddleware=async(req,res,next)=>{
    if(!isValidObjectId(req.params.productid)){
        res.status(404);
        throw new Error(`Invalid object of : ${req.params.productid}`)
    }
    next();
}

export default checkIdMiddleware;
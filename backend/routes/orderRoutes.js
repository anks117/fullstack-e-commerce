import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
const router=express.Router();



router.post('/',authenticate, async(req,res)=>{

    const {orderItems,shippingAddress,totalPrice,grandTotalPrice,taxPrice,shippingPrice}=req.body;

    if(orderItems.length<=0){
       return  res.status(400).json({message:"no items"})
    }

    try{
        const itemsInDB=await Product.find({
        _id:{$in: orderItems.map((oi)=>oi.product._id)}
        })

        const dbOrderItems=orderItems.map((clientItems)=>{
            const isItemsMatching=itemsInDB.find((item)=>item._id.toString() ===clientItems.product._id);

            if(!isItemsMatching){
                return res.status(400).json(`item id with : ${clientItems.product._id} not found`)
            }

            return{
                name:clientItems.product.name,
                image:clientItems.product.image,
                price:clientItems.product.price,
                quantity:clientItems.quantity,
                product:clientItems.product._id,
            }
        })

        
        const newOrder=await Order.create({
            user:req.user._id,
            orderItems:dbOrderItems,
            shippingAddress,
            shippingPrice,
            taxPrice,
            itemPrice:totalPrice,
            totalPrice:grandTotalPrice
        })

        res.status(200).json(newOrder);
    }catch(error){
        res.status(500).json({ error: error.message });
    }



})

router.get('/mine',authenticate,async(req,res)=>{
    const userId=req.user._id;

    try {
        const myOrders=await Order.find({user:userId})
        if(!myOrders){
            return res.status(200).json({message:"You dont have any orders"})
        }
        res.json(myOrders);    
    } catch (error) {
        res.status(400).json({message:error});
    }
})

router.get('/allorders',authenticate,authorizeAdmin,async(req,res)=>{
    try{
        const allOrders=await Order.find({}).populate('user','id username')
        res.status(200).json(allOrders);
    }catch(error){
        res.status(400).json({message:error});
    }
})

router.get('/totalsales',authenticate,authorizeAdmin,async(req,res)=>{
    try{
        const allorders=await Order.find({});
        const totalSales=allorders.reduce((sum,orders)=>sum+orders.totalPrice,0);
        res.json(totalSales);
    }catch(error){
        res.status(400).json({message:error});
    }
})

router.get('/totalOrders',authenticate,authorizeAdmin,async(req,res)=>{
    try {
        const totalOrders=await Order.countDocuments();
        res.status(200).json(totalOrders)
    } catch (error) {
        res.status(400).json({message:error});
    }
})

router.get('/total-sales-by-date',authenticate,authorizeAdmin,async(req,res)=>{
    try {
        const salesByDate = await Order.aggregate([
          {
            $match: {
              isPaid: true,
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
              },
              totalSales: { $sum: "$totalPrice" },
            },
          },
        ]);
        
        res.json(salesByDate);
       
    } catch (error) {
        res.status(400).json({message:error});
    }
})

router.get('/:orderId',authenticate,async(req,res)=>{
    const orderId=req.params.orderId
    try {
        const order=await Order.findById(orderId).populate('user','email username');
        if(order){
            res.status(200).json(order);
        }else{
            res.json({message:`you dont have any order with orderId: ${orderId}`})
        }
        
    } catch (error) {
        res.status(400).json({message:error});
    }
})

router.put('/:orderId/pay',authenticate,async(req,res)=>{
    
    try {
        const order=await Order.findById(req.params.orderId)
        if(order){
            order.isPaid=true;
            order.paidAt= Date.now()
        }else{
            return res.status(400).json({message:"order not found"})
        }
        const orderPaid=await order.save();
        res.status(200).json(orderPaid);

    } catch (error) {
        res.status(400).json({message:error});
    }
})

router.put('/:orderId/deliver',authenticate,authorizeAdmin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.orderId);
        if(order){
            order.isDeliverd=true,
            order.deliveredAt=Date.now();
        }else{
            return res.status(400).json({message:"order not found"})
        }
        const orderDelivered=await order.save();
        res.status(200).json(orderDelivered);

    } catch (error) {
        res.status(400).json({message:error});
    }
})



export default router;
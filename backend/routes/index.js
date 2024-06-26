import express from 'express'
import userRouter from './userRoutes.js'
import categoryRouter from './categoryRoutes.js'
import productRouter from './productRoutes.js'
import favouriteRouter from './favouriteRoutes.js'
import cartRouter from './cartRoutes.js'
import orderRouter from './orderRoutes.js'

const router=express.Router();

router.use('/user',userRouter);
router.use('/category',categoryRouter);
router.use('/product',productRouter);
router.use('/favourite',favouriteRouter);
router.use('/cart',cartRouter);
router.use('/order',orderRouter);

export default router
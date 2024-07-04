
import { useEffect, useState } from 'react';
import BarChart from '../../components/BarChart'
import {  useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from '../../redux/api/orderApiSlice'
import { Link } from 'react-router-dom'
import { useGetTotalUsersQuery } from '../../redux/api/userApiSlice';
import { useGetTotalProductsQuery } from '../../redux/api/productApiSlice';
import Loader from '../../components/Loader';

const Dashboards = () => {
    const {data:totalSalesbyDate,refetch:refetchTotalSalesbyDate}=useGetTotalSalesByDateQuery();
    const {data:totalSales, refetch:refetchTotalSales}=useGetTotalSalesQuery();
    const {data:totalUsers, refetch:refetchTotalUsers}=useGetTotalUsersQuery();
    const {data:totalOrders, refetch:refetchTotalOrders}=useGetTotalOrdersQuery();
    const {data:totalProducts, refetch:refetchTotalProducts}=useGetTotalProductsQuery();
    

    const [chartData,setChartData]=useState({
        labels:totalSalesbyDate?.map(cd=>cd._id),
        datasets:[{
            label: "Total Sales",
            data:totalSalesbyDate?.map(cd=>cd.totalSales),
            backgroundColor:["rgba(23,127,23,1)"]
        }]
    })

    useEffect(()=>{
        refetchTotalSalesbyDate();
        
        setChartData({
            labels:totalSalesbyDate?.map(cd=>cd._id),
            datasets:[{
                label: "Total Sales by date",
                data:totalSalesbyDate?.map(cd=>cd.totalSales),
                backgroundColor:["rgba(23,127,23,1)"]
            }]
        })
        console.log(totalSalesbyDate);
    },[totalSalesbyDate,refetchTotalSalesbyDate])

    useEffect(()=>{
        refetchTotalOrders();
    },[refetchTotalOrders,totalOrders])

    useEffect(()=>{
        refetchTotalProducts();
    },[refetchTotalProducts,totalProducts])

    useEffect(()=>{
        refetchTotalSales();
    },[refetchTotalSales,totalSales])

    useEffect(()=>{
        refetchTotalUsers();
    },[refetchTotalUsers,totalUsers])



  return (
    <div className='flex flex-col justify-center items-center'>

        <div className='flex justify-between w-4/5'>
            <Link to={'/admin/userlist'} className="w-40 bg-green-600 overflow-hidden hover:shadow-lg hover:shadow-green-400 transition-all shadow-md shadow-green-400  sm:rounded-lg ">
                    <div className="px-4 py-5 sm:p-6">
                        <dl>
                            <dt className="text-sm leading-5 font-medium text-gray-200 truncate ">Total Users</dt>
                            <dd className="mt-1 text-3xl leading-9 font-semibold text-white ">{totalUsers? totalUsers:<Loader />}</dd>
                        </dl>
                    </div>
            </Link>
            <Link to={'/admin/orderlist'} className="w-40 bg-green-600 overflow-hidden hover:shadow-lg hover:shadow-green-400 transition-all shadow-md shadow-green-400  sm:rounded-lg ">
                    <div className="px-4 py-5 sm:p-6">
                        <dl>
                            <dt className="text-sm leading-5 font-medium text-gray-200 truncate ">Total Orders</dt>
                            <dd className="mt-1 text-3xl leading-9 font-semibold text-white ">{totalOrders? totalOrders:<Loader />}</dd>
                        </dl>
                    </div>
            </Link>
            <div className="w-40 bg-green-600 overflow-hidden hover:shadow-lg hover:shadow-green-400 transition-all shadow-md shadow-green-400  sm:rounded-lg ">
                    <div className="px-4 py-5 sm:p-6">
                        <dl>
                            <dt className="text-sm leading-5 font-medium text-gray-200 truncate ">Total Sales</dt>
                            <dd className="mt-1 text-3xl leading-9 font-semibold text-white ">&#8377;{totalSales? (totalSales/100000).toFixed(2):<Loader />}L</dd>
                        </dl>
                    </div>
            </div>
            <Link to={'/admin/productlist'} className="w-40 bg-green-600 overflow-hidden hover:shadow-lg hover:shadow-green-400 transition-all shadow-md shadow-green-400  sm:rounded-lg ">
                    <div className="px-4 py-5 sm:p-6">
                        <dl>
                            <dt className="text-sm leading-5 font-medium text-gray-200 truncate ">Total Products</dt>
                            <dd className="mt-1 text-3xl leading-9 font-semibold text-white ">{totalProducts? totalProducts:<Loader/>}</dd>
                        </dl>
                    </div>
            </Link>
        </div>

        <div className='w-5/6 mt-20'>
        <BarChart chartData={chartData}/>
        </div>

    </div>
  )
}

export default Dashboards
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../components/ProductsCard/Products';
import './Home.css'
import { getCartDataById } from '../store/cartSlice';
import { fetchProducts} from '../store/productSlice';


const Home = ({setNavebar,filterData,setCategory}) => {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.product);
    const [gridView,setGridView]=useState(true);
    const handleViewButton=()=>{
        setGridView((prevView)=>!prevView);
    }
    useEffect(()=>{       
        setNavebar(true)
        setCategory("all")
        dispatch(fetchProducts());        
        dispatch(getCartDataById(userId))
    },[])
    return (
        <>
        <div className='home-Wrapper'> 
            <div className='home-products-bar'>  
            <span style={{color:"black"}}>Products</span>
            <button className='inactive-btn' onClick={(e)=>{handleViewButton()}}>{gridView?"List View":"Grid View"}</button>              
            </div>
            <Products gridView={gridView} userId={userId} filterData={filterData}/>
        </div>
        </>
       
    );
};
export default Home;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToCart,} from '../../store/cartSlice';

import PlaceOrder from '../PlaceOrder/PlaceOrder';
import './Cart.css'
const Cart = ({setNavebar}) => {
    const dispatch = useDispatch();
    const {cartData:products} = useSelector((state) => state.cart);
    const { userId } = useSelector((state) => state.product);
    const [totalPrice,setTotalPrice]=useState(0)
    const [orderPlaced,setOrderPlace]=useState(false)
    const handlePlaceOrder=()=>{
        setNavebar(true)
         setOrderPlace(!orderPlaced)
    }
    const handleRemove = (product) => {
        setTotalPrice((prev)=>prev-(product.price*product.cartQuantity));
         dispatch(removeToCart({userId:userId,ProductId:product.id}))
    };
   useEffect(()=>{
    setNavebar(true)
    products && products.map((ele)=>{
        setTotalPrice((prevprice)=>(prevprice)+(Math.round(ele.price)*(ele.cartQuantity)))
    })    
   },[])
   console.log("total "+totalPrice)
   console.log("cart user Id "+userId)
    return (
        <>                    
           { orderPlaced==false ?           
           (
            <>
            <div className="cartWrapper">
            
               <div className="cartBar">
                <h5>Item</h5>
                <h5>Title</h5>
                <h5>Quantity</h5>
                <h5>Price</h5>
                <h5></h5>
               </div>
                {products && products.map((product) => ( 
                  
                    <div key={product.id} className="cartCard">
                        <img src={product.image} alt="" />
                        <h5>{product.title}</h5>
                        <h5>{product.cartQuantity}</h5>
                        <h5>${product.price*product.cartQuantity}</h5>
                        <button
                            className="button-28"
                            onClick={(e) => handleRemove(product)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className='cartDown'>
                <div className='quantity-btn'><h4>Total Items: {products.length}</h4></div>
                <div className='quantity-btn'> <h4>Total Price : ${totalPrice}</h4></div>
                <div><button className="button-28" onClick={(e)=>handlePlaceOrder()}>Place Order</button></div>
            </div>   
            </>         
            ):(
                <PlaceOrder userId={userId} handlePlaceOrder={handlePlaceOrder} setNavebar={setNavebar}/>
            )          

            }
           
        
        </>
       
    );
};

export default Cart;

import React, { useEffect, useState } from 'react'
import '../LoginSignupPage/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function PlaceOrder({handlePlaceOrder,setNavebar}) {
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.product);
      const [checkout,setCheckout]=useState(false)
      const checkOut=async(e)=>{     
        setCheckout(true)        
        try{
        (await axios.put(`http://localhost:3825/api/userlogin/updatequantity/${userId}`)).then((ele)=>{
            
        })    
        }
        catch{
            console.log("error")
        }       
      }
      useEffect(()=>{
        setNavebar(false)
      },[])
      const backToHome=()=>{
        navigate("/Home")
      }
  return (
    <>
     { checkout==false?
     (<div class="container">      
      <div class="box-1">
          <div class="content-holder">             
          </div>
      </div>   
      <div class="box-2">
          <div class="login-form-container">
              <h1>Place Order</h1>
              <input type="text" placeholder="Name" class="input-field" required/>
              <br/><br/>
              <input type="text" placeholder="Mobile Number" class="input-field" required />
              <br/><br/>
              <input type="text" placeholder="Address" class="input-field"  required/>
              <br/><br/>
              <button class="login-button" type="submit"  onClick={(e)=>checkOut()} style={{marginRight:"10px"}}>checkOut</button>
              <button class="login-button" type="button" onClick={(e)=>handlePlaceOrder()} >Back to Cart</button>
          </div>
    </div>
    </div>
    ):(
        <div class="container">      
        <div class="box-1">
            <div class="content-holder">              
            </div>
        </div>   
        <div class="box-2">
            <div class="login-form-container">
                <h1>Thanks For Shopping!</h1>
                <button class="login-button" type="button" onClick={(e)=>backToHome()} >Back to Home</button> 
            </div>
      </div>
      </div>
    )
    }
 </>
  )
}

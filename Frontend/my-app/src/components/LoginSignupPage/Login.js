import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Image from '../../Images/pic.jpg'
import { restoreCart } from '../../store/cartSlice';
import {restoreProducts,setUserid} from '../../store/productSlice'
import { useDispatch, useSelector } from 'react-redux';
export default function Login({setUserId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin,setLogin]=useState(true);
      const [signIN,setSignIn]=useState({
        "username":"",
        "password":""
      });     
      const [signUp,setSignUp]=useState({
        "username":"",
        "password":"",
        "email":""
      })

      const handleSignIn=(e)=>{
        setSignIn({...signIN,[e.target.name]:e.target.value})
      }
      const handleSignUp=(e)=>{
        setSignUp({...signUp,[e.target.name]:e.target.value})
      }
    //   http://localhost:3825/api/userlogin/verification/govind/1234
      const onSignInSubmit=async(e)=>{  
        console.log("clicked")      
        try{
       let Id= await axios.post(`http://localhost:3825/api/userlogin/verification/${signIN.username}/${signIN.password}`);       
        if(Id.data!=-1){
            // setUserId(Id.data);
            console.log("loginuserId",Id.data)
            dispatch(setUserid(Id.data))
            navigate("/Home");
        }     
        }
        catch{}       
      }
      const changeSignUp=()=>{
        setLogin((prev)=>!prev)
      }
      useEffect(()=>{
        dispatch(restoreCart())
        dispatch(restoreProducts())
      },[])
  
   console.log("userDetails",signIN);

  return (
    <>
   {
   isLogin ? (<div class="container">      
    <div class="box-1">
        <div class="content-holder">
            {/* <h2>Hello!</h2> */}
            <img src={Image}/>
           
        </div>
    </div>   
    <div class="box-2">
        <div class="login-form-container">
            <h1>Shopping Hub</h1>
            <input type="text" placeholder="Username" class="input-field" name="username" onChange={(e)=>{handleSignIn(e)}} />
            <br/><br/>
            <input type="password" placeholder="Password" class="input-field" name="password" onChange={(e)=>{handleSignIn(e)}}/>
            <br/><br/>
            <button class="login-button" type="button"  onClick={(e)=>{onSignInSubmit(e)}}>Login</button>
        </div><br/>
        <div style={{display:"flex",justifyContent:"end",color:"black",gap:"10px",marginRight:"9rem"}}>
            <span style={{fontWeight:"bolder",marginTop:"5px",}}>new User ?</span>
            <button style={{background:"blue",color:"white",border:"none",borderRadius:"5px",width:"4rem",height:"2rem"}} onClick={(e)=>{changeSignUp(e)}}  type="button" >signUp </button>
        </div>
  </div>
  </div>):(
       <div class="container">      
       <div class="box-1">
           <div class="content-holder">
               {/* <h2>Hello!</h2> */}
               <img src={Image}/>
              
           </div>
       </div>   
       <div class="box-2">
           <div class="login-form-container">
               <h1>Shopping Hub</h1>
               <input type="text" placeholder="Username" class="input-field" name="username" onChange={(e)=>{handleSignIn(e)}} />
               <br/><br/>
               <input type="password" placeholder="Password" class="input-field" name="password" onChange={(e)=>{handleSignIn(e)}}/>
               <br/><br/>
               <button class="login-button" type="button"  onClick={(e)=>{changeSignUp(e)}}>Sign Up</button>    
        </div>
     </div>
     </div>
  )
   }  
 </>
    
  )
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css'
import { BsCart4,BsFillHouseDoorFill } from "react-icons/bs";
import { FiHome } from "react-icons/fi";

const Navbar = ({setNavebar,setCategory}) => {
    let navigate=useNavigate();
    const {cartQuantity} = useSelector((state) => state.cart);
    const handleLogout=()=>{
        setNavebar(false);
           navigate("/")
    }
    const handleCategory=(e)=>{
        setCategory(e.target.name);
    }
    return (
        <div           
            className='navBar'
        >
            <span className="logo">Shooping Hub</span>
            <div className='nav-links'>             
                <Link  to="/Home">
                  <BsFillHouseDoorFill style={{width:"2rem",height:"2rem",color:"white"}}/>
                </Link>               
            </div>
            <div className='nav-right'>
            <Link to="/cart" >
            <div className="cart">
            <span class="count">{cartQuantity}</span>
            <i class="material-icons"><BsCart4 /></i>
            </div>
            </Link>
            <button className="navLink" name="clothing" onClick={(e)=>{handleCategory(e)}} >
                    Clothing
            </button>
            <button className="navLink" name="electronics" onClick={(e)=>{handleCategory(e)}} >
                    Electronics
            </button>
            <button className="navLink" name="jewelery" onClick={(e)=>{handleCategory(e)}} >
                     Jewelery
            </button>

            <button className="navLink" onClick={(e)=>handleLogout()} >
                    Logout
            </button>
            </div>
         
        </div>
    );
};

export default Navbar;

import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateCart} from '../../store/cartSlice';
import {setQuantity } from '../../store/productSlice';
import { STATUSES } from '../../store/productSlice';
import './Product.css'
const Products = ({gridView,filterData}) => {
    const dispatch = useDispatch();
    const { data: products, status,quantity,userId } = useSelector((state) => state.product);

    const { cartData} = useSelector((state) => state.cart);
    //pagination//
    const itemPerPage=10;
    const [currentPage,setCurrentPage]=useState(0);
    const rowss=products.slice(currentPage*itemPerPage,(currentPage+1)*itemPerPage);
    const rows=filterData(products).slice(currentPage*itemPerPage,(currentPage+1)*itemPerPage);
    const numberOfPage=Math.ceil(filterData(products).length/itemPerPage);
    const pageIndex=Array.from({length:numberOfPage},(_,idx)=>idx+1)
    const handlePageChange=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }
    ///////////////////////   
 
    const handleAdd = (product) => {
        dispatch(updateCart({userID:userId,productId:product.id,productQuantity:quantity[product.id]})); 
    };
    
    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }
  
    const handleQuantity=(e,id)=>{
       if(e.target.name=='plus'){
        let arr=[...quantity];
        arr[id]++;
        dispatch(setQuantity(arr));
       }
       else {
        let arr=[...quantity];
        arr[id]--;
        dispatch(setQuantity(arr));
       }
    }
   
    const getStars=(value)=>{
        let stars=[];
        for(let i=0;i<value;i++)
        stars.push(<span class="fa fa-star fa-1.5x checkedcolor" ></span>);
        for(let i=0;i<5-value;i++)
        stars.push(<span class="fa fa-star fa-1.5x " ></span>);
        return stars;
    }
    return (
        <>
       
         {gridView ? (
           <div><div className="productsWrapper">
            {rows.map((product) => (                
                // filterData(product,product.category) && 
                (<div>
                <div className="card" key={product.id}>
                    <div><img src={product.image} alt="" /></div>
                    <div className='cart-details'><h4>{product.title}</h4><br/>
                    <div className='star-container'>        
                       <h4>Price <span>$</span>{product.price}</h4>
                       <div> {
                            getStars(product.rating)
                        }
                        </div>
                    </div> 
                    <br></br>
                    <h5><span>Available Quantity - </span>{product.actualquantity}</h5><br/>      


            <div className='cardFooter'>
                 {product.actualquantity>0 && <div className='quantity-btn'>
                    <button className='man-btn' name='minus' disabled={quantity[product.id]==1 } onClick={(e)=>{handleQuantity(e,product.id)}}>
                    -
                    </button>
                   
                     <span>{quantity[product.id]}</span>
                 <button  className='man-btn' name='plus' disabled={quantity[product.id]==product.actualquantity} onClick={(e)=>{handleQuantity(e,product.id)}}>
                     +
                    </button>
                 </div>
                 }

                 <div>
                     <button disabled={product.actualquantity==0} onClick={(e) => handleAdd(product)} className="button-28">                       
                        {
                           product.actualquantity==0?"Sold Out":  cartData && cartData.filter((ele)=>ele.id===product.id).length>0 ? "Added" :  "Add to cart"
                        }
                    </button>
                </div>
            </div>                 
                </div> 
                </div>              
                </div>)
                
            ))}
            </div>
             <div className='page-btn'>
              <button className='inactive-btn' disabled={currentPage<1} onClick={()=>{handlePageChange(currentPage-1)}}>Previous</button>
                {pageIndex.slice(Math.max(0,currentPage-2),Math.min(numberOfPage,currentPage+3))
                 .map((page)=>(<button key={page} onClick={()=>handlePageChange(page-1)} className={page===currentPage+1?"active-btn":"inactive-btn"}>{page}</button>)) }
              <button className='inactive-btn' disabled={currentPage>=numberOfPage-1}  onClick={()=>{handlePageChange(currentPage+1)}}>Next</button>
             </div>
             </div>
             

        ):(
            <div>
                <div className="listBar">
                <h5>Item</h5>
                <h5>Title</h5>
                <h5>Available Quantity</h5>
                <h5>Quantity</h5>
                <h5>Price</h5>
               </div>
            <div className="listWrapper">
            {rows.map((product) => (
                <div key={product.id} className="listcartCard">
                    <img src={product.image} alt="" />
                    <h5>{product.title}</h5>
                    <h5>{product.actualquantity}</h5>
                <div className='quantity-btn'>
                 <button className='man-btn' name='minus' disabled={quantity[product.id]==1} onClick={(e)=>{handleQuantity(e,product.id)}}>-</button>
                 <span>{quantity[product.id]}</span>
                 <button className='man-btn' name='plus' onClick={(e)=>{handleQuantity(e,product.id)}}>+</button>
                 </div>
                    <h5>${product.price}</h5>
                    <button onClick={() => handleAdd(product)} className="button-28">
                       {
                         product.actualquantity==0?"Sold Out": cartData && cartData.filter((ele)=>ele.id===product.id).length>0 ? "Added" :  "Add to cart"
                       }
                    </button>
                </div>
            ))}
        </div>
        <div className='page-btn'>
              <button className='inactive-btn' disabled={currentPage<1} onClick={()=>{handlePageChange(currentPage-1)}}>Previous</button>
                {pageIndex.slice(Math.max(0,currentPage-2),Math.min(numberOfPage,currentPage+3))
                 .map((page)=>(<button key={page} onClick={()=>handlePageChange(page-1)} className={page===currentPage+1?"active-btn":"inactive-btn"}>{page}</button>)) }
              <button className='inactive-btn' disabled={currentPage>=numberOfPage-1}  onClick={()=>{handlePageChange(currentPage+1)}}>Next</button>
             </div>
        </div>
        )
        }
        </>
       
    );
};

export default Products;

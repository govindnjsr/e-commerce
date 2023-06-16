
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: [],
        updateStatus: STATUSES.IDLE,
        getCartStatus: STATUSES.IDLE,
        removeStatus:STATUSES.IDLE,
        cartQuantity:0,
        removeFromCart:false
    },
    reducers: {
      
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload);
        }, 
        restoreCart(state,action){
            let emptyarr=[]
            state.cartData=emptyarr;
            state.cartQuantity=0;
        },
         
    },
      extraReducers: (builder) => {
        builder
            .addCase(updateCart.pending, (state, action) => {
                state.updateStatus = STATUSES.LOADING;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.cartData = action.payload;
                state.cartQuantity=action.payload.length
                state.updateStatus = STATUSES.IDLE;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.updateStatus = STATUSES.ERROR;
            })
            .addCase(getCartDataById.fulfilled, (state, action) => {
                            state.cartData = action.payload;
                            state.cartQuantity=action.payload.length
                            state.getCartStatus = STATUSES.IDLE;
                        })
             .addCase(getCartDataById.pending, (state, action) => {
                            
                            state.getCartStatus = STATUSES.LOADING;
                })
            .addCase(removeToCart.fulfilled, (state, action) => {
                state.cartData = action.payload;
                state.cartQuantity=action.payload.length            
                state.removeStatus = STATUSES.IDLE;
            })
    },    
 
});

export const { addToCart, remove ,restoreCart} = cartSlice.actions;
export default cartSlice.reducer;

// http://localhost:3825/api/userlogin/1/addtocart/16
export const updateCart=createAsyncThunk('updateCart',async ({userID,productId,productQuantity})=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({...requestdto })
    };    
    const res =await fetch(`http://localhost:3825/api/userlogin/${userID}/addtocart/${productId}/${productQuantity}`, requestOptions)
    const data = await res.json();
    return data;
    // return data;
});

export const removeToCart=createAsyncThunk('removeToCart',async({userId,ProductId})=>{
    const requestOptions = {
        method: 'POST'
    };
    const res =await fetch(`http://localhost:3825/api/userlogin/${userId}/removetocart/${ProductId}`, requestOptions);
    const data = await res.json();
    return data;
})
export const getCartDataById=createAsyncThunk('getToCart',async(userId)=>{
    const res = await fetch(`http://localhost:3825/api/userlogin/getdata/${userId}`);
    const data = await res.json();
    console.log("ressssss "+JSON.stringify(res));
    return data;    
})


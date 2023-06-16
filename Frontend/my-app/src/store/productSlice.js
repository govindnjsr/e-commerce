const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        quantity:[],
        userId:-1,
    },
    reducers: {
         setQuantity(state,action){
            state.quantity=action.payload;
         },
         restoreProducts(state,action){
            let emptyarr=[]
            state.data=emptyarr;
            state.quantity=emptyarr;
         },
         setUserid(state,action){
            state.userId=action.payload;
         }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.quantity=Array(action.payload.length+1).fill(1)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setProducts, setStatus ,setQuantity ,restoreProducts ,setUserid,userId} = productSlice.actions;
export default productSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('http://localhost:3825/api/products/get');
    const data = await res.json();
    return data;
});


// export const fetchTodoById = todoId => async dispatch => {
//     const response = await client.get(`/fakeApi/todo/${todoId}`)
//     dispatch(todosLoaded(response.todos))
//   }
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }
